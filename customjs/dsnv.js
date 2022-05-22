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

   this.xoaNV = function (maNV) {
      var index = this.timViTrinV(maNV);

      //action delete
      if (index !== -1) {
         this.arr.splice(index, 1);
      }
   };

   this.suaNV = function (maNV) {
      var index = this.timViTrinV(maNV);
      if (index !== -1) {
         return this.arr[index];
      }
      return null;
   };

   this.capNhat = function (nv) {
      //tim vi tri nv muon cap nhat
      var index = this.timViTriNV(nv.maNV);
      if (index !== -1) {
         this.arr[index] = nv;
      }
   };

   this.timKiemNV = function (keyword) {
      /**
       * 0. tao mangTimKiem = []
       * 1. duyet mang arr
       * 2. neu item.tennV trung voiw keyword
       *  => them nv dc tim thay vao mangTimKiem
       * 3. Tra ve mangTimKiem
       */

      var mangTimKiem = [];
      this.arr.forEach(function (item) {
         // if (item.tenNV === keyword) {
         //v2
         if (item.tenNV.toLowerCase().includes(keyword.toLowerCase())) {
            mangTimKiem.push(item);
         }
      });
      return mangTimKiem;
   };
}
