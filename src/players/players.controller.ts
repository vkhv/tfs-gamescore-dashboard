import { Controller, Get, Post, Body, Delete } from '@nestjs/common';
import { Player } from './Player';
import { PlayersService } from './players.service';
import {readFileSync, writeFile}  from 'fs';



@Controller('players')
export class PlayersController {

    constructor(private readonly playerService: PlayersService) {}


    @Post()
    savePlayers(@Body() body ): Player | {error: string} {
	const {name, value} = body;
	if(name && value) {

        	this.playerService.savePlayer({name, value});
		return {name, value};
	} else {
		return {error: 'Тело запроса должно содержать name и value'}	
	}

    }
    @Get() 
    getAllPlayers() {
        return readFileSync('/tmp/storage.js').toString()
    }

	@Delete()
    deleteAll() {
        writeFile('/tmp/storage.js', '""', "utf8", (err) => {
            console.log(err)
        })
    }

}
