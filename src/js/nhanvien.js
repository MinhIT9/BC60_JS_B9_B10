function NhanVien(
    _userName,
    _fullName,
    _email,
    _workday,
    _baseSalary,
    _position,
    _timeWork,
) {
    this.userName = _userName;
    this.fullName = _fullName;
    this.email = _email;
    this.workDay = _workday;
    this.baseSalary = _baseSalary;
    this.position = _position;
    this.timeWork = _timeWork;
    this.totalSalary = 0;
    this.xepLoai = "";

    this.caculaterSalary = function () {
        switch (this.position) {

            // Tính lương của Giám Đốc
            case 'Giám đốc':
                this.totalSalary = this.baseSalary * 3;
                break;

            // Tính lương của Trưởng Phòng
            case 'Trưởng phòng':
                this.totalSalary = this.baseSalary * 2;
                break;

            // Tính lương của Nhân Viên
            default:
                this.totalSalary = this.baseSalary * 1;
        }
        return this.totalSalary;
    }

    // Xep loai nhanVien
    this.xepLoaiNhanVien = function () {
        if (condition) {
            
        } else {
            
        }
    }
}