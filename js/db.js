let dbPromise = idb.open("irfan-submission-2", 4, function (upDB) {
    if (!upDB.objectStoreNames.contains('TeamFavorite')) {
        let teamStore = upDB.createObjectStore('TeamFavorite', {
            keyPath: 'id',
            autoIncrement: false
        })
        teamStore.createIndex('id', 'id', {
            unique: true
        })
    }
})
// Menambahkan Data ke IndexedDb
function TambahDbFavorite(data) {
    dbPromise.then(db => {
        let tx = db.transaction('TeamFavorite', 'readwrite')
        tx.objectStore('TeamFavorite').put(data)
        return tx.complete
    })
}
// Membaca Data di IndexedDb
function getSemua() {
    return dbPromise.then(async db => {
        let tx = await db.transaction('TeamFavorite', 'readonly')
        let store = await tx.objectStore('TeamFavorite')
        return await store.getAll()
    })
}
// Check Apakah Data Ada di dalam indexedDb
function checkDataDB(id) {
    return dbPromise.then(async db => {
        let tx = await db.transaction('TeamFavorite', 'readonly')
        let data = await tx.objectStore('TeamFavorite').get(id)
        return data == undefined ? false : true
    })

}
// delete data didalam idexedb
function deleteFavorite(id) {
    dbPromise.then(db => {
        let tx = db.transaction('TeamFavorite','readwrite')
        tx.objectStore('TeamFavorite').delete(id)
        return tx.complete
    })
}