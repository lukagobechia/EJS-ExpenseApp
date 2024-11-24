const form = document.querySelector("form");
const updateButton = document.getElementById("main update-button");
const addButton = document.getElementById("add-button");

const handlePost = async () => {
  const category = form.elements["category"].value;
  const price = form.elements["price"].value;
  const paymentMethod = form.elements["payment-method"].value;

  if (!category || !price || !paymentMethod) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/api/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ category, price, paymentMethod }),
    });

    if (res.ok) {
      const data = await res.json();
      console.log("Success:", data);
      window.location.href = "/api/expenses";
    } else {
      const errorData = await res.json();
      console.error("Error:", errorData.message);
      alert(`Failed to add expense: ${errorData.message}`);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while adding the expense.");
  }
};

const handleDelete = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/expenses/${id}`, {
      method: "DELETE",
    });
    if (res.status === 200) {
      location.reload();
    } else {
      console.log("Failed to delete expense");
    }
  } catch (e) {
    console.log("Could not delete expense:", e);
  }
};

const prepareUpdate = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/expenses/${id}`, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error("Could not fetch expense data");
    }

    const { data: expense } = await res.json();

    document.getElementById("category").value = expense.category;
    document.getElementById("price").value = expense.price;
    document.getElementById("payment-method").value = expense.paymentMethod;

    updateButton.setAttribute("data-id", id);

    updateButton.style.display = "block";
    updateButton.style.backgroundColor = "#2196F3";
    addButton.style.display = "none";
  } catch (e) {
    console.log("Could not fetch or update expense:", e);
  }
};

const handleUpdate = async () => {
  const id = updateButton.getAttribute("data-id");

  const category = document.getElementById("category").value;
  const price = document.getElementById("price").value;
  const paymentMethod = document.getElementById("payment-method").value;

  if (!category || !price || !paymentMethod) {
    alert("Please fill in all fields.");
    return;
  }
  const updatedExpense = {
    category: category,
    price: price,
    paymentMethod: paymentMethod,
  };

  try {
    const res = await fetch(`http://localhost:3000/api/expenses/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedExpense),
    });

    if (res.ok) {
      window.location.href = "/api/expenses";
    } else {
      alert("Failed to update expense");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while updating the expense.");
  }
};
