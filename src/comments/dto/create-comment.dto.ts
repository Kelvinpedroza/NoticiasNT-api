export class CreateCommentDto {
    id: string
    userName: string
    description: string
    created: Date
    deleted: Date
}

export interface findAllParameters {
    title: string
    status: string
}