const dynamicTitle = (deviceName) => {
    return new Promise(async (resolve, reject) => {
        try{
            document.title = `${deviceName || 'Device'} | Smart Home`;
            resolve(document.title);
        }
        catch(error){
            console.error(error);
            reject(document.title);
        }
    })
}

export default dynamicTitle;