var dsnv = new DanhSachNhanVien();
var validation = new Validation();
var nhanVien = new NhanVien();

// Gọi Method
nhanVien.tinhTongLuong();
nhanVien.xepLoaiNhanVien();
// Gọi getLocalStorage
getLocalStorage();

function getID(id) {
   return document.getElementById(id);
}


function layThongTinNV(isAdd) {
   //Dom toi cac the input lay value
   var _taiKhoan = getID("tknv").value;
   var _tenNV = getID("name").value;
   var _email = getID("email").value;
   var _pass = getID("password").value;
   var _ngayLam = getID("datepicker").value;
   var _luongCoBan = getID("luongCB").value;
   var _chucvu = getID("chucvu").value;
   var _workingHours = getID("gioLam").value;

   // Flag - isValid là true hợp lệ / false: không hợp lệ.
   var isValid = true;

   // Check validation
   if (isAdd) {
      // Tai khoan NV
      isValid &= validation.kiemTraDoDaiKiTu
         (_taiKhoan,
            "tbTKNV",
            4,
            6,
            "(*) Tài khoản nhập tối đa 4 - 6 ký số, không để trống"
         ) && validation.kiemTraTKTonTai
            (
               _taiKhoan,
               "tbTKNV",
               "(*) Tài khoản đã tồn tại",
               dsnv.arr
            );
   }
   // TenNV 
   isValid &= validation.kiemTraChuoiKiTu
      (_tenNV,
         "tbTen",
         "(*) Tên nhân viên phải là chữ, không để trống"
      )

   // Email
   isValid &= validation.kiemTraEmail
      (_email,
         "tbEmail",
         "(*) Email phải đúng định dạng, không để trống"
      )

   // Password
   isValid &= validation.kiemTraDoDaiKiTu
      (_pass,
         "tbMatKhau",
         6,
         10,
         "(*) mật Khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt), không để trống "
      ) && validation.kiemTraPassword
         (
            _pass,
            "tbMatKhau",
            "(*) mật Khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt), không để trống "
         )

   // Ngay lam
   isValid &= validation.kiemTraRong
      (
         _ngayLam,
         "tbNgay",
         "(*) Ngày làm không để trống, định dạng mm/dd/yyyy"
      )

   // luongCoBan
   isValid &= validation.kiemTraNumber
      (_luongCoBan,
         "tbLuongCB",
         "(*) Lương cơ bản 1.000.000 - 20.000.000, không để trống"
      ) && validation.kiemTraDoDaiKiTu
         (
            _luongCoBan,
            "tbLuongCB",
            7,
            8,
            "(*) Lương cơ bản 1.000.000 - 20.000.000, không để trống"
         )

   // Chuc vu
   isValid &= validation.kiemTraChucVu
      ("chucvu",
         "tbChucVu",
         "(*) Vui lòng chọn chức vụ hợp lệ (Giám đốc, Trưởng Phòng, Nhân Viên)"
      )

   // WorkingHours
   isValid &= validation.kiemTraNumber
      (_workingHours,
         "tbGiolam",
         "(*) Số giờ làm trong tháng 80 - 200 giờ, không để trống"
      ) && validation.kiemTraDoDaiKiTu
         (
            _workingHours,
            "tbGiolam",
            2,
            3,
            "(*) Số giờ làm trong tháng 80 - 200 giờ, không để trống"
         )
   // Check isValid
   if (!isValid) return;

   //Tao doi tuong nhanVien tu lop doi tuong NhanVien
   var nhanVien = new NhanVien(
      _taiKhoan,
      _tenNV,
      _email,
      _pass,
      _ngayLam,
      _luongCoBan,
      _chucvu,
      _workingHours
   );

   // Tinh tong luong
   nhanVien.tinhTongLuong();

   return nhanVien;
}
/**
 * Them nhan vien
 */

getID("btnThemNV").onclick = function () {

   var nhanVien = layThongTinNV(true);
   if (nhanVien) {
      // Thêm NV
      dsnv.themNV(nhanVien);
      renderStaffTable(dsnv.arr);
      setLocalStorage();
   }
};

function renderStaffTable(data) {
   // console.log(data);
   var content = "";

   data.forEach(function (item) {
      content += `
      <tr>
         <td>${item.taiKhoan}</td>
         <td>${item.tenNV}</td>
         <td>${item.email}</td>
         <td>${item.ngayLam}</td>
         <td>${item.chucvu}</td>
         <td>${item.tongLuong}</td>
         <td>${item.loaiNV}</td>
         <td>
          <button class = "btn btn-success" data-toggle="modal" data-target="#myModal" onclick=" suaNV('${item.taiKhoan}')">Sửa</button>
          <button class = "btn btn-danger" onclick=" xoaNV('${item.taiKhoan}')">Xóa</button>
         </td>
      </tr>
      `
   });
   getID("tableDanhSach").innerHTML = content;

}

/**
 * Xoa NV 
 */
function xoaNV(id) {
   dsnv.xoaNV(id);
   renderStaffTable(dsnv.arr);
   setLocalStorage();
}

/**
 * Sua NV
 */
function suaNV(id) {

   var nv = dsnv.suaNV(id);
   if (nv) {
      // Dom tới các thẻ input show value
      getID("tknv").value = nv.taiKhoan;
      getID("name").value = nv.tenNV;
      getID("email").value = nv.email;
      getID("password").value = nv.pass;
      getID("datepicker").value = nv.ngayLam;
      getID("luongCB").value = nv.luongCoBan;
      getID("chucvu").value = nv.chucvu;
      getID("gioLam").value = nv.workingHours;
   }
   // disable input#tknv
   getID("tknv").disabled = true;
}

/**
 * Cap nhat NV
 */
getID("btnCapNhat").onclick = function () {
   var nhanVien = layThongTinNV(false);
   dsnv.capNhat(nhanVien);
   renderStaffTable(dsnv.arr);
   setLocalStorage();
}

/**
 * Tim kiem NV 
 */
getID("searchName").addEventListener("keyup", function () {
   var searchName = getID("searchName").value;
   var mangTimKiem = dsnv.timKiemNV(searchName);
   renderStaffTable(mangTimKiem);
})

function setLocalStorage() {
   // Convert from JSON to String
   var dataString = JSON.stringify(dsnv.arr);
   // Luu xuong localStorage
   localStorage.setItem("DSNV", dataString);
}

function getLocalStorage() {
   if (localStorage.getItem("DSNV")) {

      var dataString = localStorage.getItem("DSNV");
      // Convert from String to JSON 
      var dataJson = JSON.parse(dataString);
      dsnv.arr = dataJson;
      renderStaffTable(dsnv.arr);
   }
}