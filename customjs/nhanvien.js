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
      if (this.chucVu === "Sếp") {
         this.tongLuong = this.luongCoBan * 3;
      } else if (this.chucVu === "Trưởng phòng") {
         this.tongLuong = this.luongCoBan * 2;
      } else if (this.chucVu === "Nhân viên") {
         this.tongLuong = this.luongCoBan;
      }
   };

   this.xepLoaiNhanVien = function () {
      if (this.workingHours >= 192) {
         this.xepLoaiNV = "Nhân viên xuất sắc";
      } else if (this.workingHours >= 176) {
         this.xepLoaiNV = "Nhân viên giỏi";
      } else if (this.workingHours >= 160) {
         this.xepLoaiNV = "Nhân viên khá";
      } else if (this.workingHours < 160) {
         this.xepLoaiNV = "Nhân viên trung bình";
      }
   };

}
