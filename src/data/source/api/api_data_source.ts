export interface APiDataSource {
    get(path:string): Promise<any>
}
