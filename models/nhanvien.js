function NhanVien(
    _taiKhoan,
    _tenNV,
    _email,
    _pass,
    _ngayLam,
    _luongCoBan,
    _chucVu,
    _workingHours,
) {
    this.taiKhoan = _taiKhoan;
    this.tenNV = _tenNV;
    this.email = _email;
    this.pass = _pass;
    this.ngayLam = _ngayLam;
    this.luongCoBan = _luongCoBan;
    this.chucVu = _chucVu;
    this.workingHours = _workingHours;
    this.tongLuong = 0;
    this.xepLoaiNV = "";

    this.tinhTongLuong = function () {
        if (this.chucVu === "Sếp") return this.tongLuong = this.luongCoBan * 3;
        if (this.chucVu === "Trưởng phòng") return this.tongLuong = this.luongCoBan * 2;
        if (this.chucVu === "Nhân viên") return this.tongLuong = this.luongCoBan;
    };

    this.xepLoaiNhanVien = function () {
        //đã có validation nên bỏ câu dưới
        // if (this.workingHours <= 80 && this.workingHours >= 200) return this.xepLoaiNV = "không đủ điều kiện xếp loại nhân viên";
        if (this.workingHours >= 192) return this.xepLoaiNV = "Nhân viên xuất sắc";
        if (this.workingHours >= 176) return this.xepLoaiNV = "Nhân viên giỏi";
        if (this.workingHours >= 160) return this.xepLoaiNV = "Nhân viên khá";
        if (this.workingHours < 160) return this.xepLoaiNV = "Nhân viên trung bình";
    };

}