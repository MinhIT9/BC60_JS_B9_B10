function DSNV() {
    //arr chứa nhiều đối tượng nhân viên
    this.arr = [];

    // Tìm vị trí nhân viên
    this.timViTriNV = function (_userName) {
        var index = -1;
        for (var i = 0; i < this.arr.length; i++) {
            const nv = this.arr[i];
            if (nv.userName === _userName) {
                index = i;
                break;
            }
        }
        return index;
    }

    // Lấy thông tin NhanVien
    this.layThongTinNV = function (_userName) {
        const index = this.timViTriNV(_userName);
        if (index !== -1) {
            return this.arr[index];
        }
        return null;
    }

    // Add new NhanVien
    this.themNV = function (nv) {
        this.arr.push(nv);
    };

    // Delete NhanVien
    this.deleteNV = function (_userName) {
        const index = this.timViTriNV(_userName);
        if (index !== -1) {
            this.arr.splice(index, 1)
        }
    };

    // UpdateNV
    this.updateNV = function (nv) {
        const index = this.timViTriNV(nv.userName);
        if (index !== -1) {
            this.arr[index] = nv;
        }
    }
}