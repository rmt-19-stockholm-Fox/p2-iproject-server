function formatRupiah(data) {
	return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(data)
}


module.exports = formatRupiah