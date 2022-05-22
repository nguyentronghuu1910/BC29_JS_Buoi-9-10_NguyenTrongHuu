function NhanVien(
   _taiKhoan,
   _tenNhanVien,
   _email,
   _matKhau,
   _ngayLam,
   _luongCoBan,
   _chucvu,
   _workingHours,
   _loaiNV,
   _tongLuong
) {
   this.taiKhoan = _taiKhoan;
   this.tenNhanVien = _tenNhanVien;
   this.email = _email;
   this.matKhau = _matKhau;
   this.ngayLam = _ngayLam;
   this.luongCoBan = _luongCoBan;
   this.chucvu = _chucvu;
   this.workingHours = _workingHours;

   this.loaiNV = _loaiNV;
   this.tongLuong = _tongLuong;


   this.tinhTongLuong = function () {
      this.tongLuong =
         this.chucVu = this.luongCoBan * 3;

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
   // this.tinhLuongChucVu = function () {
   //    var sep = 0;
   //    var truongPhong = 0;
   //    var nhanVien = 0;

   //    if (sep === luongCoBan * 3) {

   //    } else if (truongPhong === luongCoBan * 2) {

   //    } else if (nhanVien === luongCoBan) {

   //    }
   // }
}
