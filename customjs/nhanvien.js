function NhanVien(
   _taiKhoan,
   _tenNV,
   _email,
   _pass,
   _ngayLam,
   _luongCoBan,
   _chucvu,
   _workingHours,

) {
   this.taiKhoan = _taiKhoan;
   this.tenNV = _tenNV;
   this.email = _email;
   this.pass = _pass;
   this.ngayLam = _ngayLam;
   this.luongCoBan = _luongCoBan;
   this.chucvu = _chucvu;
   this.workingHours = _workingHours;
   this.tongLuong = 0;
   this.xepLoaiNV = "";


   this.tinhTongLuong = function () {
      if (this.chucVu === "Sếp") {
         this.tongLuong = this.luongCoBan * 3;
      } else if (this.chucVu === "Trưởng Phòng") {
         this.tongLuong = this.luongCoBan * 2;
      } else if (this.chucVu === "Nhân Viên") {
         this.tongLuong = this.luongCoBan;
      }
   };

   this.xepLoaiNhanVien = function () {

      if (this.workingHours >= 192) {
         return "Nhân viên xuất sắc";
      } else if (this.workingHours >= 176) {
         return "Nhân viên giỏi";
      } else if (this.workingHours >= 160) {
         return "Nhân viên khá";
      } else if (this.workingHours < 160) {
         return "Nhân viên trung bình";
      } else {
         return "không đủ điều kiện xếp loại nhân viên";
      }
   };

}
