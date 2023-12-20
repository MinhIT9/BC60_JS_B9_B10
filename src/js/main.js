const dsnv = new DSNV();
const validation = new Validation();

getLocalStorage();

function getId(id) {
    return document.getElementById(id);
}
function getClass(Class) {
    return document.getElementsByClassName(Class);
}

function layThongTinNV() {
    const _userName = getId('tknv').value;
    const _fullName = getId('name').value;
    const _email = getId('email').value;
    const _workDay = getId('datepicker').value;
    const _baseSalary = getId('luongCB').value;
    const _position = getId('chucvu').value;
    const _timeWork = getId('gioLam').value;

    // flag: boolean
    // var isVlid = true;

    // if (isAdd) {
    //     isVlid &=
    //         validation.kiemTraRong(_userName, "tknv", "(*) Vui lòng nhập số tài khoản")
    //         && validation.kiemTraDoDaiKiTu(_userName, "tknv", "(*) Tài khoản phải dài 4 - 6 ký số", 4, 6)
    // }

    // isVlid &=
    //     validation.kiemTraRong(_fullName, "name", "(*) Vui long nhap tenSV")


    // // Nếu isValid là false thì dừng function
    // if (!isVlid) return;
    // console.log(isAdd);
    // console.log(isVlid);

    // Create object nv from class object nhanVien
    const nv = new NhanVien(
        _userName,
        _fullName,
        _email,
        _workDay,
        _baseSalary,
        _position,
        _timeWork
    )

    // Call method caculaterSalary
    nv.caculaterSalary();

    return nv;
}

function renderUI(data) {
    var content = "";

    // console.log(data);
    for (var i = 0; i < data.length; i++) {
        const nv = data[i];
        // console.log(nv.totalSalary);
        content += `
            <tr>
                <td>${nv.userName}</td>
                <td>${nv.fullName}</td>
                <td>${nv.email}</td>
                <td>${nv.workDay}</td>
                <td>${nv.position}</td>
                <td>${formatTienLuong(nv.totalSalary)}</td>
                <td>Xep Loai</td>
                <td style="width: 16%">
                    <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="handleEdit('${nv.userName}')">Edit</button>
                    <button class="btn btn-danger" onclick="handleDelete('${nv.userName}')">delete</button>
                </td>
            </tr>
        `;
    }

    getId("tableDanhSach").innerHTML = content;
}


// Add NhanVien
getId('btnThem').onclick = function () {
    // Update title => header model
    getId("header-title").innerHTML = "Thêm nhân viên mới"

    // Add button "Add Product" => footer modal
    const btnAdd = `<button type="button" class="btn btn-success" onclick="addNV()">Thêm vào</button>`
    const btnDong = `<button id="btnDong" type="button" class="btn btn-danger" data-dismiss="modal">Đóng</button>`
    getClass("modal-footer")[0].innerHTML = btnAdd + btnDong

}
function addNV() {
    // Get infor employee
    const nv = layThongTinNV();

    // add NhanVien
    dsnv.themNV(nv);

    // show
    renderUI(dsnv.arr);

    // Save to localStorage
    setLocalStorage();

    // close form addNhanVien
    resetNV();
}

// Remove NhanVien
function handleDelete(_userName) {
    // delete nv
    dsnv.deleteNV(_userName);
    // render tbody
    renderUI(dsnv.arr);
    // save data to localStorage
    setLocalStorage();
}

// Edit NhanVien 
function handleEdit(userName) {
    const nv = dsnv.layThongTinNV(userName);

    // Update title => header model
    getId("header-title").innerHTML = "Chỉnh Sửa Sản Phẩm"
    // Add button "Update Product" => footer modal
    const btnUpdate = `<button id="btnUpdate" type="button" class="btn btn-success" onclick="updateNV()">Cập nhật</button>`
    const btnDong = `<button id="btnDong" type="button" class="btn btn-danger" data-dismiss="modal">Đóng</button>`
    getClass("modal-footer")[0].innerHTML = btnUpdate + btnDong

    // DOM to tags input and set value from nv
    getId('tknv').value = nv.userName;
    getId('name').value = nv.fullName;
    getId('email').value = nv.email;
    getId('password').value = "********";
    getId('datepicker').value = nv.workDay;
    getId('chucvu').value = nv.position;
    getId('luongCB').value = nv.baseSalary;
    getId('gioLam').value = nv.timeWork;

    // clear data sau khi bấm nút Đóng
    getId('btnDong').onclick = function () {
        resetNV();
    }
}

// Update NhanVien
function updateNV() {
    // Get infor NhanVien
    const nv = layThongTinNV();
    // console.log("nv", nv);
    dsnv.updateNV(nv);
    // render tbody
    renderUI(dsnv.arr);
    // save data to localStorage
    setLocalStorage();

    resetNV();
    // location.reload(true);
}

// Reset nhanVien
function resetNV() {
    getId('btnDong').onclick = function () {
        getId('tknv').value = '';
        getId('name').value = '';
        getId('email').value = '';
        getId('password').value = '';
        getId('datepicker').value = '';
        getId('luongCB').value = '';
        getId('gioLam').value = '';
    };
    getId('btnDong').click();
}

// formatTienLuong
function formatTienLuong(salary) {
    // Sử dụng toLocaleString() để định dạng số tiền lương
    return salary.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

//save data to localStorage of browser
function setLocalStorage() {
    //convert data JSON => string
    const dataString = JSON.stringify(dsnv.arr);
    // save to localStorage
    localStorage.setItem("DSNV", dataString);
}

function getLocalStorage() {
    const dataString = localStorage.getItem("DSNV");

    if (dataString) {
        // convert string => json
        const dataJson = JSON.parse(dataString);
        // Recovery data for dsnv.arr
        dsnv.arr = dataJson;
        // render UI
        renderUI(dsnv.arr);
    }
}
