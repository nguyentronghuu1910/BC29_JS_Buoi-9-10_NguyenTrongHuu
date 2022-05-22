var dsnv = new DanhSachNhanVien();

getLocalStorage();

function getID(id) {
   return document.getElementById(id);
}


function layThongTinNV() {
   //Dom toi cac the input lay value
   var _taiKhoan = getID("tknv").value;
   var _tenNhanVien = getID("name").value;
   var _email = getID("email").value;
   var _matKhau = getID("password").value;
   var _ngayLam = getID("datepicker").value;
   var _luongCoBan = getID("luongCB").value;
   var _chucvu = getID("chucvu").value;
   var _workingHours = getID("gioLam").value;

   //Tao doi tuong nhanVien tu lop doi tuong NhanVien
   var nhanVien = new NhanVien(_taiKhoan,
      _tenNhanVien,
      _email,
      _matKhau,
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

   var nhanVien = layThongTinNV();
   dsnv.themNV(nhanVien);

   renderStaffTable(dsnv.arr);
   setLocalStorage();
};

function renderStaffTable(data) {
   // console.log(data);
   var content = "";

   data.forEach(function (item) {
      content += `
      <tr>
         <td>${item.taiKhoan}</td>
         <td>${item.tenNhanVien}</td>
         <td>${item.email}</td>
         <td>${item.ngayLam}</td>
         <td>${item.chucvu}</td>
         <td>${item.tongLuong}</td>
         <td>${item.loaiNV}</td>
         <td>
          <button class = "btn btn-success">Sửa</button>
          <button class = "btn btn-danger" onclick= "xoaNV('${item.taiKhoan}')">Xóa</button>
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

}

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