

export interface User {
    userId: string;
    email: string;
    password: string;
    nickname: string;
    following: string[]; // 배열로 처리
    follower: string[]; // 배열로 처리
    createdAt: Date;
    userStatus: boolean;
    profileImage: string;
}

export interface Board {
    boardId: string;
    userId: string;
    title: string;
    comment: string;
    tag: string;
    createdAt: Date;
    updatedAt: Date;
    view: number;
    like: number;
    thumbnail: string;
}