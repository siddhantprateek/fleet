import { Router, Request, Response } from "express";

let routes = Router()

routes.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        message: "fleet rest svc",
        health: "ok"
    })
})

export { routes };