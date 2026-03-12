const btn = document.getElementById("reviewBtn");
const codeInput = document.getElementById("codeInput");
const output = document.getElementById("output");
const reviewResult = document.getElementById("reviewResult");

btn.addEventListener("click", async () => {
  const code = codeInput.value.trim();

  if (!code) {
    alert("Please paste some code first.");
    return;
  }

  btn.disabled = true;
  btn.textContent = "Reviewing...";
  output.classList.add("hidden");

  try {
    const res = await fetch("/review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });

    const data = await res.json();

    if (res.ok) {
      reviewResult.textContent = data.review;
    } else {
      reviewResult.textContent = "Error: " + (data.error || "Something went wrong.");
    }

    output.classList.remove("hidden");
  } catch (err) {
    reviewResult.textContent = "Network error. Make sure the server is running.";
    output.classList.remove("hidden");
  } finally {
    btn.disabled = false;
    btn.textContent = "Review Code";
  }
});
