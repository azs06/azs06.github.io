export const WORLDCUP_API_BASE = 'https://worldcup26.ir/get';

export type MatchType = 'group' | 'r32' | 'r16' | 'qf' | 'sf' | 'third' | 'final';

export interface WCTeam {
  id: string;
  name_en: string;
  iso2: string;
  flag: string;
  groups: string;
}

export interface WCStadium {
  id: string;
  name_en: string;
  city_en: string;
  country_en: string;
}

export interface WCGame {
  id: string;
  home_team_id: string;
  away_team_id: string;
  home_team_name_en?: string;
  away_team_name_en?: string;
  home_team_label?: string;
  away_team_label?: string;
  home_score: string;
  away_score: string;
  group: string;
  matchday: string;
  local_date: string;
  stadium_id: string;
  finished: string;
  time_elapsed: string;
  type: MatchType;
}

export interface WCGroupTeam {
  team_id: string;
  mp: string;
  w: string;
  l: string;
  d: string;
  pts: string;
  gf: string;
  ga: string;
  gd: string;
}

export interface WCGroup {
  name: string;
  teams: WCGroupTeam[];
}

export interface WorldCupData {
  games: WCGame[];
  teams: WCTeam[];
  groups: WCGroup[];
  stadiums: WCStadium[];
}

const STAGE_LABELS: Record<MatchType, string> = {
  group: 'Group Stage',
  r32: 'Round of 32',
  r16: 'Round of 16',
  qf: 'Quarter-finals',
  sf: 'Semi-finals',
  third: 'Third Place',
  final: 'Final',
};

export function getStageLabel(type: string): string {
  return STAGE_LABELS[type as MatchType] ?? type.toUpperCase();
}

export function parseMatchDate(localDate: string): Date {
  const [datePart, timePart = '00:00'] = localDate.split(' ');
  const [month, day, year] = datePart.split('/').map(Number);
  const [hours, minutes] = timePart.split(':').map(Number);
  return new Date(year, month - 1, day, hours, minutes);
}

export function isFinished(game: WCGame): boolean {
  return game.finished.toUpperCase() === 'TRUE';
}

export function isLive(game: WCGame): boolean {
  if (isFinished(game)) return false;
  const elapsed = game.time_elapsed.toLowerCase();
  return elapsed !== 'notstarted' && elapsed !== 'finished' && elapsed !== '';
}

export function isUpcoming(game: WCGame): boolean {
  return !isFinished(game) && !isLive(game);
}

export function getTeamName(
  game: WCGame,
  side: 'home' | 'away',
  teamMap: Map<string, WCTeam>
): string {
  const directName = side === 'home' ? game.home_team_name_en : game.away_team_name_en;
  if (directName) return directName;

  const label = side === 'home' ? game.home_team_label : game.away_team_label;
  if (label) return label;

  const teamId = side === 'home' ? game.home_team_id : game.away_team_id;
  return teamMap.get(teamId)?.name_en ?? 'TBD';
}

export function getTeamFlag(
  game: WCGame,
  side: 'home' | 'away',
  teamMap: Map<string, WCTeam>
): string | undefined {
  const teamId = side === 'home' ? game.home_team_id : game.away_team_id;
  return teamMap.get(teamId)?.flag;
}

export function getStadiumName(stadiumId: string, stadiumMap: Map<string, WCStadium>): string {
  const stadium = stadiumMap.get(stadiumId);
  if (!stadium) return '';
  return `${stadium.name_en}, ${stadium.city_en}`;
}

export function sortGamesByDate(games: WCGame[]): WCGame[] {
  return [...games].sort(
    (a, b) => parseMatchDate(a.local_date).getTime() - parseMatchDate(b.local_date).getTime()
  );
}

export function buildTeamMap(teams: WCTeam[]): Map<string, WCTeam> {
  return new Map(teams.map((team) => [team.id, team]));
}

export function buildStadiumMap(stadiums: WCStadium[]): Map<string, WCStadium> {
  return new Map(stadiums.map((stadium) => [stadium.id, stadium]));
}

async function fetchJson<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${WORLDCUP_API_BASE}/${endpoint}`);
  if (!response.ok) {
    throw new Error(`World Cup API error (${response.status}) for ${endpoint}`);
  }
  return response.json() as Promise<T>;
}

export async function fetchWorldCupData(): Promise<WorldCupData> {
  const [gamesPayload, teamsPayload, groupsPayload, stadiumsPayload] = await Promise.all([
    fetchJson<{ games: WCGame[] }>('games'),
    fetchJson<{ teams: WCTeam[] }>('teams'),
    fetchJson<{ groups: WCGroup[] }>('groups'),
    fetchJson<{ stadiums: WCStadium[] }>('stadiums'),
  ]);

  return {
    games: sortGamesByDate(gamesPayload.games),
    teams: teamsPayload.teams,
    groups: groupsPayload.groups.sort((a, b) => a.name.localeCompare(b.name)),
    stadiums: stadiumsPayload.stadiums,
  };
}
