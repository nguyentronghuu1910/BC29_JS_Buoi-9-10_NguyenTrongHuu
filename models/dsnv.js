function DanhSachNhanVien() {
    this.arr = [];

    this.timViTriNV = function (taiKhoan) {

        var index = -1;
        this.arr.forEach(function (item, i) {
            if (item.taiKhoan === taiKhoan)
                index = i;
        });
        return index;
    };

    this.themNV = function (nv) {
        this.arr.push(nv);
    };

    this.xoaNV = function (taiKhoan) {
        var index = this.timViTriNV(taiKhoan);

        //action delete
        if (index !== -1) {
            this.arr.splice(index, 1);
        }
    };

    this.suaNV = function (taiKhoan) {
        var index = this.timViTriNV(taiKhoan);
        if (index !== -1) return this.arr[index];
        return null;
    };

    this.capNhat = function (nv) {
        //tim vi tri nv muon cap nhat
        var index = this.timViTriNV(nv.taiKhoan);
        if (index !== -1) return this.arr[index] = nv;
    };

    this.timKiemNV = function (searchName) {
        /**
         * 0. tao mangTimKiem = []
         * 1. duyet mang arr
         * 2. neu item.loaiNV trung voi searchName
         *  => them nv dc tim thay vao mangTimKiem
         * 3. Tra ve mangTimKiem
         */

        var mangTimKiem = [];
        this.arr.forEach(function (item) {
            if (item.xepLoaiNV.toLowerCase().includes(searchName.toLowerCase())) {
                mangTimKiem.push(item);
            }
        });
        return mangTimKiem;
    };
}