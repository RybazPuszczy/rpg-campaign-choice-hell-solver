import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount } from "@/components/ui/avatar"
import { HybridTooltip, HybridTooltipTrigger, HybridTooltipContent } from "./ui/hybrid-tooltip";
import { Card, CardContent } from "./ui/card"
import { Progress } from "./ui/progress"

type Player = { id: number, name: string, }

type GameDate = { date: Date, players: number[]}

async function getPlayers() : Promise<Player[]>{
    return [
        { id: 1, name: "John Doe",},
        { id: 2, name: "Nutcracker",},
        { id: 3, name: "admin",},
        { id: 4, name: "Mike the Second",},
        { id: 5, name: "Łukasz Niebochodzik",},
    ]
}

async function getDates() : Promise<GameDate[]> {
    return [
        {date: new Date("2026-10-10T12:00:00Z"), players: [1]},
        {date: new Date("2026-10-11T12:00:00Z"), players: [1,3,5]},
        {date: new Date("2026-10-17T12:00:00Z"), players: [1,2,3,5]},
        {date: new Date("2026-10-18T12:00:00Z"), players: [1,2,3,4,5]},
    ]
}

function monthToString(month: number){
    switch(month){
        case 0: return "sty"; break
        case 1: return "lut"; break
        case 2: return "mar"; break
        case 3: return "kwi"; break
        case 4: return "maj"; break
        case 5: return "cze"; break
        case 6: return "lip"; break
        case 7: return "sie"; break
        case 8: return "wrz"; break
        case 9: return "paź"; break
        case 10: return "lis"; break
        case 11: return "gru"; break
    }
}

function getPlayerAvatar(player : Player){
    const nameSplit = player.name.split(" ")
    const avatarFallback = nameSplit.length==1 ? player.name.substring(0,2)
    : nameSplit[0][0] + nameSplit[1][0]

    return (
        <HybridTooltip>
            <HybridTooltipTrigger nativebutton="false">
                    <Avatar>
                        <AvatarFallback>{avatarFallback}</AvatarFallback>
                    </Avatar>
            </HybridTooltipTrigger>
        <HybridTooltipContent>{player.name}</HybridTooltipContent>
        </HybridTooltip>
    )
}

export default async function AvailabilitySummaryChart(){
    const players = await getPlayers().then(e=>{return e})
    const dates = await getDates().then(e=>{return e})
    return (

        <Card className="w-full">
            <CardContent>
                {
                    dates.map(d=>{
                        const playersFiltered : Player[] = players.filter(p=>{return d.players.includes(p.id)})
                        const pCount = playersFiltered.length
                        return <div key={"date-"+d.date} className="grid grid-cols-2 pb-4 last:pb-0">
                            <div>
                            {`${d.date.getDate()} ${monthToString(d.date.getMonth())}`}
                            </div>
                            
                            <div>
                                <AvatarGroup className="justify-end">
                                {playersFiltered?.slice(0,pCount>4?3:4).map(p=>{
                                    return <span key={"player-"+p.id}>
                                        {getPlayerAvatar(p)}
                                    </span>})
                                }
                                {pCount>4 ? 
                                <HybridTooltip>
                                    <HybridTooltipTrigger nativebutton="false">
                                        <AvatarGroupCount>{`+${pCount-3}`}</AvatarGroupCount>
                                    </HybridTooltipTrigger>
                                    <HybridTooltipContent className={"text-pretty"}>
                                    <div>
                                    {playersFiltered?.slice(3).map(p=>{return <p key={`pname-${p.id}`}>{p.name}</p>})}
                                    </div>
                                    </HybridTooltipContent> 
                                </HybridTooltip>: <></>}
                                </AvatarGroup>
                            </div>

                            <Progress value={100*pCount/players.length} 
                            className="text-chart-3 col-span-2"/>
                            <div className="col-span-2">
                                Kompatybilne gry: ...
                            </div>
                        </div>
                    })
                }
            </CardContent>
        </Card>

    )
}