const searchInput = document.getElementById('search-input');
const rows = document.getElementsByTagName('tbody')[0].getElementsByTagName('tr');

searchInput.addEventListener('input', function() {
  const searchTerm = this.value.trim().toLowerCase();
  for (let i = 0; i < rows.length; i++) {
    const cells = rows[i].getElementsByTagName('td');
    let matchFound = false;
    for (let j = 0; j < cells.length - 1; j++) {
      const cellText = cells[j].innerText.toLowerCase();
      if (cellText.includes(searchTerm)) {
        matchFound = true;
        break;
      }
    }
    rows[i].style.display = matchFound ? '' : 'none';
  }
});
