export default (url: string) => {
    const paramString = url.includes('?') ? url.split('?')[1].split('&') : [];
    const params: { [key: string]: string } = {};

    paramString.forEach(param => {
        const paramSpit = param.split('=');
        params[paramSpit[0]] = paramSpit[1];
        return params;
    });
};