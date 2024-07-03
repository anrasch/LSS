document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-img");
    const captionText = document.getElementById("caption");
    const closeModal = document.getElementsByClassName("close")[0];
    const buyNowBtn = document.getElementById("buy-now");
    const searchInput = document.getElementById("search-input");

    document.querySelectorAll(".gallery-img").forEach(item => {
        item.addEventListener("click", function () {
            modal.style.display = "block";
            modalImg.src = this.src;
            captionText.innerHTML = this.alt;
            buyNowBtn.href = this.parentElement.getAttribute("data-link");
        });
    });

    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.addEventListener("click", function () {
            const filter = this.getAttribute("data-filter");
            document.querySelectorAll(".gallery-item").forEach(item => {
                if (filter === "all" || item.getAttribute("data-category") === filter) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            });
        });
    });

    // Suchfunktion
    searchInput.addEventListener("input", function () {
        const searchTerm = searchInput.value.toLowerCase();
        document.querySelectorAll(".gallery-item").forEach(item => {
            const title = item.getAttribute("data-title").toLowerCase();
            if (title.includes(searchTerm)) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    });
});
