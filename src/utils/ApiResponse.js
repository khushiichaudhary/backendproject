class ApiResponse{
    constructor(success, message, data){
        this.success = this.statusCode < 400;
        this.message = message;
        this.data = data;
        this.statusCode = this.statusCode
    }
}