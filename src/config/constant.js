// 如果NODE_ENV为production，basUrl为生产环境地址
var baseUrl = process.env.NODE_ENV === 'production' ? 'http://localhost:8081' : ''
export default baseUrl
