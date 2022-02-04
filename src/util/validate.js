const Validate = {
    validateField: function (value, condition) {
       // console.log(value, condition);
        let reg;
        switch (condition) {
            case 'email':
                reg = /^[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
                return value === "" ? true : reg.test(value);
            case 'mobile':
                reg = /^[0-9]{10}$/;
                return value === "" ? true : reg.test(value);
            case 'password':
                reg = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*\d)[a-zA-Z\d]{6,24}$/;
                return reg.test(value);
            case 'aadharCard':
                reg = /^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$/;
                return reg.test(value);
            case 'passport':
                reg = /^[a-zA-Z]{1}([0-9]){7}?$/;
                return reg.test(value);
            case 'votingId':
                reg = /^([a-zA-Z]){3}([0-9]){7}?$/;
                return reg.test(value);
            case 'drivingLicense':
                reg = /^[A-z0-9]{15}$|^[0-9]{2}[/][0-9]{3}[/][0-9]{4}$/;
                return reg.test(value);
            case 'pincode':
                reg = /^[1-9][0-9]{5}$/;
                return reg.test(value);
            case 'pancard':
                reg = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;
                return reg.test(value);
            default:
                return true;
        }
    },
}
export { Validate as default };