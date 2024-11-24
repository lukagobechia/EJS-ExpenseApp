const form = document.querySelector("form");
const handleDelete = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/expenses/${id}`, {
      method: "DELETE",
    });
    if (res.status === 200) {
      window.location.href = "/api/expenses";
    } else {
      console.log("Failed to delete expense");
    }
  } catch (e) {
    console.log("Could not delete expense:", e);
  }
};

const handleBackToList = () => {
  window.location.href = "/api/expenses";
};

const editButton = document.querySelector(".update-btn");
const saveButton = document.querySelector(".save-btn");

const prepareUpdate = async () => {
  try {
    editButton.style.display = "none";
    saveButton.style.display = "inline-block";

    document.getElementById("category").disabled = false;
    document.getElementById("price").disabled = false;
    document.getElementById("payment-method").disabled = false;
    document.getElementById("date").disabled = false;
  } catch (e) {
    console.log("Could not fetch or update expense:", e);
  }
};

const handleUpdate = async (id) => {
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
      location.reload();
    } else {
      alert("Failed to update expense");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while updating the expense.");
  }
};
