import fs from "fs/promises";
export const getExpenses = async (req, res) => {
  try {
    const expenses = await fs.readFile("db/expenses.json");
    const parsedExpenses = JSON.parse(expenses);

    let { page = 1, take = 10 } = req.query;

    if (take < 1) {
      take = 10;
    } else if (take > 10) {
      take = 10;
    }

    const totalPages =
      parsedExpenses.length === 0
        ? 1
        : parsedExpenses.length % take === 0
        ? parsedExpenses.length / take
        : Math.floor(parsedExpenses.length / take) + 1;

    if (page < 1) {
      page = 1;
    } else if (page > totalPages) {
      page = totalPages;
    }
    parsedExpenses.sort((a, b) => new Date(b.date) - new Date(a.date));
    const slicedExpense = parsedExpenses.slice((page - 1) * take, take * page);
    res.status(200).render("pages/expenses.ejs", { slicedExpense });
  } catch (error) {
    console.log("Error: ", error.message);
    return res
      .status(500)
      .json({ message: "error retrieving data", data: null });
  }
};
export const getExpensesById = async (req, res) => {
  try {
    const expenses = await fs.readFile("db/expenses.json");
    const parsedExpenses = JSON.parse(expenses || "[]");
    const { id } = req.params;
    const expense = parsedExpenses.find((el) => el.id === Number(id));

    if (!expense) {
      return res.status(404).json({ message: "expense not found", data: null });
    }
    res.status(200).json({ message: "success", data: expense });
  } catch (error) {
    console.log("Error get: ", error.message);
    return res.status(500).json({ message: "error retrieving data" });
  }
};

export const addExpenses = async (req, res) => {
  try {
    const { category, price, paymentMethod } = req.body;

    const expenses = await fs.readFile("db/expenses.json", "utf-8");
    const parsedExpenses = JSON.parse(expenses || "[]");
    const lastId = parsedExpenses[parsedExpenses.length - 1]?.id || 0;

    const newExpense = {
      id: lastId + 1,
      category: category,
      price: price,
      paymentMethod: paymentMethod,
      date: new Date().toISOString(),
    };
    parsedExpenses.push(newExpense);

    await fs.writeFile(
      "db/expenses.json",
      JSON.stringify(parsedExpenses, null, 2)
    );

    res.status(201).json({ message: "New expense created", data: newExpense });
  } catch (error) {
    console.log("Error: ", error.message);
    return res.status(500).json({ message: "error adding data", data: null });
  }
};
export const deleteExpenses = async (req, res) => {
  try {
    const expenses = await fs.readFile("db/expenses.json", "utf-8");
    const parsedExpenses = JSON.parse(expenses || "[]");

    const { id } = req.params;

    const index = parsedExpenses.findIndex((el) => el.id === Number(id));

    if (index === -1) {
      return res.status(404).json({ message: "expense not found", data: null });
    }

    const deletedItem = parsedExpenses.splice(index, 1);

    await fs.writeFile(
      "db/expenses.json",
      JSON.stringify(parsedExpenses, null, 2)
    );
    res
      .status(200)
      .json({ message: "deleted successfully", data: deletedItem });
  } catch (error) {
    console.log("Error: ", error.message);
    return res.status(500).json({ message: "error deleting data", data: null });
  }
};
export const updateExpenses = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, price, paymentMethod } = req.body;

    const expenses = await fs.readFile("db/expenses.json", "utf-8");
    const parsedExpenses = JSON.parse(expenses || "[]");

    const index = parsedExpenses.findIndex((el) => el.id === Number(id));
    if (index === -1) {
      return res.status(404).json({ message: "expense not found", data: null });
    }

    parsedExpenses[index] = {
      ...parsedExpenses[index],
      category: category || parsedExpenses[index].category,
      price: price || parsedExpenses[index].price,
      paymentMethod: paymentMethod || parsedExpenses[index].paymentMethod,
    };

    await fs.writeFile(
      "db/expenses.json",
      JSON.stringify(parsedExpenses, null, 2)
    );

    res
      .status(200)
      .json({ message: "updated successfully", data: parsedExpenses[index] });
  } catch (error) {
    console.log("Error: ", error.message);
    return res.status(500).json({ message: "error updating data", data: null });
  }
};

export const getDetails = async (req, res) => {
  try {
    const expenses = await fs.readFile("db/expenses.json");
    const parsedExpenses = JSON.parse(expenses || "[]");
    const { id } = req.params;
    const expense = parsedExpenses.find((el) => el.id === Number(id));

    if (!expense) {
      return res.status(404).json({ message: "expense not found", data: null });
    }
    res
      .status(200)
      .render("pages/details.ejs", { expense, formatDateFromISOString });
  } catch (error) {
    console.log("Error get: ", error.message);
    return res.status(500).json({ message: "error retrieving data" });
  }
};

function formatDateFromISOString(isoString) {
  const date = new Date(isoString);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  }).format(date);
  return formattedDate;
}
