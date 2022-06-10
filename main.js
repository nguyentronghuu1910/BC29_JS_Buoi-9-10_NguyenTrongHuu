function getID(id) {
    return document.getElementById(id);
}
function display(id, onOff) {
    return getID(id).style.display = onOff;
}
var dsnv = new DanhSachNhanVien();
var validation = new Validation();
var nhanVien = new NhanVien();

// Gọi Method
nhanVien.tinhTongLuong();
nhanVien.xepLoaiNhanVien();
// Gọi getLocalStorage
getLocalStorage();



function layThongTinNV(doesAdd) {
    //Dom toi cac the input lay value
    var _taiKhoan = getID("tknv").value;
    var _tenNV = getID("name").value;
    var _email = getID("email").value;
    var _pass = getID("password").value;
    var _ngayLam = getID("datepicker").value;
    var _luongCoBan = getID("luongCB").value;
    var _chucVu = getID("chucVu").value;
    var _workingHours = getID("gioLam").value;
    // Flag - isValid là true hợp lệ / false: không hợp lệ.
    var isValid = true;

    // Check validation
    if (doesAdd) {
        // taiKhoanNV
        isValid &= validation.kiemTraRong(
            _taiKhoan,
            "tbTKNV",
            "(*) Vui lòng không để trống!"
        ) && validation.kiemTraDoDaiKiTu(
            _taiKhoan,
            "tbTKNV",
            4,
            6,
            "(*) Tài khoản phải nhập từ 4 - 6 ký số!"
        ) && validation.kiemTraTKTonTai(
            _taiKhoan,
            "tbTKNV",
            "(*) Tài khoản đã tồn tại",
            dsnv.arr
        );
    }
    // TenNV 
    isValid &= validation.kiemTraRong(
        _tenNV,
        "tbTen",
        "(*) Vui lòng không để trống!"
    ) && validation.kiemTraChuoiKiTu(
        _tenNV,
        "tbTen",
        "(*) Tên nhân viên phải là chữ!"
    );

    // Email
    isValid &= validation.kiemTraRong(
        _email,
        "tbEmail",
        "(*) Vui lòng không để trống!"
    ) && validation.kiemTraEmail(
        _email,
        "tbEmail",
        "(*) Email phải đúng định dạng vd:@gmail.com/edu... !"
    );

    // Password
    isValid &= validation.kiemTraRong(
        _pass,
        "tbMatKhau",
        "(*) Vui lòng không để trống!"
    ) && validation.kiemTraDoDaiKiTu(
        _pass,
        "tbMatKhau",
        6,
        10,
        "(*) mật Khẩu từ 6-10 ký tự!"
    ) && validation.kiemTraPassword(
        _pass,
        "tbMatKhau",
        "(*) Mật khẩu phải chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt "
    );

    // Ngay lam
    isValid &= validation.kiemTraRong(
        _ngayLam,
        "tbNgay",
        "(*) Ngày làm không để trống, định dạng mm/dd/yyyy"
    );

    // luongCoBan

    //chỗ lương cơ bản nên truyền thêm đối 2 đối số 1.000.000 - 20.000.000 nếu sai ko cho nhập
    isValid &= validation.kiemTraRong(
        _luongCoBan,
        "tbLuongCB",
        "(*) Vui lòng không để trống!"
    ) && validation.kiemTraNumber(
        _luongCoBan,
        "tbLuongCB",
        "(*) Vui lòng nhập lương cơ bản bằng số!"
    ) && validation.kiemTraSoLuong(
        _luongCoBan,
        "tbLuongCB",
        1000000,
        20000000,
        "(*) Lương cơ bản 1.000.000 - 20.000.000, không nhập nhỏ hoặc lớn hơn"
    );


    // Chuc vu
    isValid &= validation.kiemTraChucVu("chucVu",
        "tbChucVu",
        "(*) Vui lòng chọn chức vụ hợp lệ (Giám đốc, Trưởng Phòng, Nhân Viên)"
    );
    // WorkingHours
    isValid &= validation.kiemTraRong(
        _workingHours,
        "tbGiolam",
        "(*) Vui lòng không để trống!"
    ) && validation.kiemTraNumber(
        _workingHours,
        "tbGiolam",
        "(*) Vui lòng nhập số giờ bằng số!"
    ) && validation.kiemTraSoLuong(
        _workingHours,
        "tbGiolam",
        80,
        200,
        "(*) Số giờ làm trong tháng 80 - 200 giờ, không nhập nhỏ hoặc lớn hơn"
    );
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
        _chucVu,
        _workingHours
    );

    // Tinh tong luong
    nhanVien.xepLoaiNhanVien();
    nhanVien.tinhTongLuong();
    console.log(nhanVien);
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
        //hide btn#btnCapNhat
        // getID("btnCapNhat").style.display = "none";
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
         <td>${item.chucVu}</td>
         <td>${item.tongLuong.toLocaleString()}</td>
         <td>${item.xepLoaiNV}</td>
         <td>
          <button class = "btn btn-success" data-toggle="modal" data-target="#myModal" onclick=" suaNV('${item.taiKhoan}')">Sửa</button>
          <button class = "btn btn-danger" onclick=" xoaNV('${item.taiKhoan}')">Xóa</button>
         </td>
      </tr>
      `;
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
        getID("chucVu").value = nv.chucVu;
        getID("gioLam").value = nv.workingHours;
    }
    // disable input#tknv

    getID("tknv").disabled = true;

    //hide btn#btnThemNV #btnCapNhat
    // getID("btnThemNV").style.display = "none";
    // getID("btnThem").style.display = "none";
    // getID("tbTKNV").style.display = "none";
    display("btnThemNV", "none");
    display("btnThem", "none");
    display("tbTKNV", "none");

    //show btn#btnCapNhat
    // getID("btnCapNhat").style.display = "block";
    // getID("refresh").style.display = "inline";
    display("btnCapNhat", "block");
    display("refresh", "inline");


}

/**
 * Cap nhat NV
 */
getID("btnCapNhat").onclick = function () {
    var nhanVien = layThongTinNV(false);

    dsnv.capNhat(nhanVien);
    renderStaffTable(dsnv.arr);
    setLocalStorage();
};

/**
 * Tim kiem NV 
 */
//look up by keyup
getID("searchName").addEventListener("keyup", function () {
    var searchName = getID("searchName").value;
    var mangTimKiem = dsnv.timKiemNV(searchName);
    renderStaffTable(mangTimKiem);
});
// look up by btn#btnTimNV
getID("btnTimNV").onclick = function () {
    var searchName = getID("searchName").value;
    var mangTimKiem = dsnv.timKiemNV(searchName);
    renderStaffTable(mangTimKiem);
};

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

