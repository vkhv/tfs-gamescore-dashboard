import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { Player } from './Player';

interface PlayerRepository {
    savePlayer(player): void
}

@Injectable()
export class PlayersService implements PlayerRepository {
    savePlayer(player: Player): void {
	const storage = JSON.parse(fs.readFileSync('/tmp/storage.js').toString());
         fs.writeFile('/tmp/storage.js', JSON.stringify([...storage, {...player}]), "utf8", (err) => {
             console.log(err)
         })
    }
}
