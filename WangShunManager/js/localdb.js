function localdb_save(str) {
    localStorage.setItem('info', str);
}

function localdb_load() {
    return JSON.parse(localStorage.getItem('info'));
}
function localdb_rem() {
    localStorage.clear();
}