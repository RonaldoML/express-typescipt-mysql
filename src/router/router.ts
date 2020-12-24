

import { Router, Request, Response } from 'express';
import MySQL from '../mysql/mysql';

const router = Router();

router.get('/heroes', (req: Request, res: Response) => {

    const query = `
                    select * from heroes
                `;

    MySQL.ejecutarQuery(query, (err: any, heroes: Object[]) => {
        if (err) {
            res.json({
                ok: false,
                error: err
            });
        } else {
            res.json({
                ok: true,
                heroes: heroes
            });
        }
    });

});

router.get('/heroes/:id', (req: Request, res: Response) => {

    const id = req.params.id;

    const scapedId = MySQL.instance.connection.escape(id);

    const query = `
                    select * from heroes where id = ${scapedId}
                `;

    MySQL.ejecutarQuery(query, (err: any, heroe: Object[]) => {
        if (err) {
            res.json({
                ok: false,
                error: err
            });
        } else {
            res.json({
                ok: true,
                heroes: heroe[0]
            });
        }
    });
});

export default router;