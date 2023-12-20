function Validation() {
    this.kiemTraRong = function (value, spanId, mess) {
        if (value === "") {
            // show error
            getId(spanId).innerHTML = mess;
            return false;
        }

        getId(spanId).innerHTML = "";
        return true;
    }

    this.kiemTraDoDaiKiTu = function (value, spanId, mess, min, max) {
        if (value.trim().length >= min && value.trim().length <= max) {
            // true
            return true;
        }
        getId(spanId).innerHTML = mess
        return false;
    }

    this.kiemTraChuoiKiTu = function (value, spanId, mess) {
        const letter = "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
        if (value.match(letter)) {
            //true  
            getId(spanId).innerHTML = "";
            return true;
        }
        // false
        getId(spanId).innerHTML = mess;
        return false;

    }

    this.kiemTraEmail = function (value, spanId, mess) {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        if (value.match(reg)) {
            //true  
            getId(spanId).innerHTML = "";
            return true;
        }
        // false
        getId(spanId).innerHTML = mess;
        return false;
    }

    this.kiemTraTonTaiSV = function (data, value, spanId, mess) {

        var valid = false;
        for (var i = 0; i < data.length; i++) {
            const sv = data[i];
            if (sv.maSV === value) {
                valid = true;
                break;
            }
        }
        if (valid) {
            getId(spanId).innerHTML = mess;
            return false;
        }
        getId(spanId).innerHTML = "";
        return true;
    }
}