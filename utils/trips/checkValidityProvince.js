const isEmpty = require("./../common/isEmpty");

const checkValidityProvince = (province) =>{

    const provinces = [
        "ANTANANARIVO",
        "ANTSIRANANA",
        "FIANARANTSOA",
        "MAHAJANGA",
        "TOAMASINA",
        "Toliara",
    ]
    // convert the province to toUppercase
    const upperProvince = province ?? "".toUpperCase();
    let isProvinceValid = false;
    
    if(isEmpty(province)){
        return isProvinceValid;
    }

    provinces.forEach((province)=>{
        if(province === upperProvince){
            isProvinceValid = true;
        }
    });
    return isProvinceValid;
}

module.exports = checkValidityProvince;