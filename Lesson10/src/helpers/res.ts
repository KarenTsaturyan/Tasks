// import http from 'http'

export function sendResponse(response:any, title:string){
    response.write(title)
    return response.end()
}