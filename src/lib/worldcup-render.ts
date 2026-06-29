/**
 * Client-side DOM builders for the live-refresh path on /scores.
 *
 * These mirror the markup of the Astro components used for the initial
 * server render (WorldCupMatchCard.astro, WorldCupGroupTable.astro,
 * WorldCupChampionBanner.astro). Keep them visually in sync — the Astro
 * components own the first paint (SEO / no-JS), these own every refresh.
 *
 * Everything is built with createElement/textContent so API-provided
 * strings can never be interpreted as HTML (no innerHTML interpolation).
 */
import type { TournamentResults, WCGame, WCGroup, WCStadium, WCTeam } from './worldcup';
import {
  getStadiumName,
  getStageLabel,
  getTeamFlag,
  getTeamName,
  isFinished,
  isLive,
  parseMatchDate,
} from './worldcup';

type Child = Node | string | null | undefined | false;

function h(tag: string, props: Record<string, string | undefined> = {}, ...children: Child[]): HTMLElement {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(props)) {
    if (value === undefined) continue;
    if (key === 'class') node.className = value;
    else node.setAttribute(key, value);
  }
  for (const child of children) {
    if (child === null || child === undefined || child === false) continue;
    node.append(typeof child === 'string' ? document.createTextNode(child) : child);
  }
  return node;
}

function flagImg(src: string, width: number, height: number, className: string, eager = false): HTMLElement {
  return h('img', {
    src,
    alt: '',
    width: String(width),
    height: String(height),
    class: className,
    loading: eager ? 'eager' : 'lazy',
  });
}

export function createMatchCard(
  game: WCGame,
  teamMap: Map<string, WCTeam>,
  stadiumMap: Map<string, WCStadium>
): HTMLElement {
  const homeName = getTeamName(game, 'home', teamMap);
  const awayName = getTeamName(game, 'away', teamMap);
  const homeFlag = getTeamFlag(game, 'home', teamMap);
  const awayFlag = getTeamFlag(game, 'away', teamMap);
  const stadium = getStadiumName(game.stadium_id, stadiumMap);
  const matchDate = parseMatchDate(game.local_date);
  const finished = isFinished(game);
  const live = isLive(game);

  const dateLabel = matchDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
  const timeLabel = matchDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });

  const stageLabel = getStageLabel(game.type);
  const groupLabel = game.type === 'group' ? `Group ${game.group}` : game.group;

  let statusBadge: HTMLElement;
  if (live) {
    statusBadge = h(
      'span',
      {
        class: 'inline-flex items-center gap-1.5 rounded-full bg-red-500/15 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-red-600 dark:text-red-400',
      },
      h('span', { class: 'h-2 w-2 animate-pulse rounded-full bg-red-500' }),
      ` Live ${game.time_elapsed}`
    );
  } else if (finished) {
    statusBadge = h(
      'span',
      { class: 'rounded-full bg-accent/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-accent' },
      'Full Time'
    );
  } else {
    statusBadge = h(
      'span',
      {
        class: 'rounded-full border border-border dark:border-[#3d352d] px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-muted dark:text-gray-400',
      },
      'Upcoming'
    );
  }

  const scoreNode =
    finished || live
      ? h(
          'p',
          {
            class: 'text-2xl sm:text-3xl font-bold tabular-nums text-primary dark:text-gray-100 font-mono',
            'data-score': '',
          },
          `${game.home_score} – ${game.away_score}`
        )
      : h('p', { class: 'text-lg font-semibold text-muted dark:text-gray-400' }, 'vs');

  return h(
    'article',
    {
      class: 'worldcup-match card-lift rounded-lg border border-border dark:border-[#3d352d] bg-paper/50 dark:bg-[#2a2520]/50 p-4 sm:p-5',
      'data-match-id': game.id,
      'data-match-type': game.type,
      'data-match-status': live ? 'live' : finished ? 'finished' : 'upcoming',
      'data-match-date': matchDate.toISOString(),
    },
    h(
      'div',
      { class: 'flex flex-wrap items-center justify-between gap-2 mb-4' },
      h(
        'div',
        {
          class: 'flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted dark:text-gray-400',
        },
        h('span', {}, stageLabel),
        h('span', { 'aria-hidden': 'true' }, '·'),
        h('span', {}, groupLabel)
      ),
      statusBadge
    ),
    h(
      'div',
      { class: 'grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-6' },
      h(
        'div',
        { class: 'flex flex-col items-end gap-2 text-right min-w-0' },
        h(
          'div',
          { class: 'flex items-center justify-end gap-2 min-w-0' },
          h('span', { class: 'font-medium text-primary dark:text-gray-100 truncate' }, homeName),
          homeFlag ? flagImg(homeFlag, 24, 18, 'h-[18px] w-6 rounded-sm object-cover shrink-0') : null
        )
      ),
      h(
        'div',
        { class: 'text-center shrink-0' },
        scoreNode,
        h('p', { class: 'mt-1 text-xs text-muted dark:text-gray-500' }, `${dateLabel} · ${timeLabel}`)
      ),
      h(
        'div',
        { class: 'flex flex-col items-start gap-2 text-left min-w-0' },
        h(
          'div',
          { class: 'flex items-center gap-2 min-w-0' },
          awayFlag ? flagImg(awayFlag, 24, 18, 'h-[18px] w-6 rounded-sm object-cover shrink-0') : null,
          h('span', { class: 'font-medium text-primary dark:text-gray-100 truncate' }, awayName)
        )
      )
    ),
    stadium ? h('p', { class: 'mt-4 text-center text-xs text-muted dark:text-gray-500' }, stadium) : null
  );
}

export function createGroupTable(group: WCGroup, teamMap: Map<string, WCTeam>): HTMLElement {
  const sortedTeams = [...group.teams].sort(
    (a, b) => Number(b.pts) - Number(a.pts) || Number(b.gd) - Number(a.gd)
  );

  const headerCell = (label: string, className: string) =>
    h('th', { class: className }, label);

  const rows = sortedTeams.map((standing, index) => {
    const team = teamMap.get(standing.team_id);
    return h(
      'tr',
      { class: 'border-t border-border/70 dark:border-[#3d352d]/70' },
      h(
        'td',
        { class: 'px-4 py-2.5' },
        h(
          'div',
          { class: 'flex items-center gap-2 min-w-0' },
          h('span', { class: 'w-4 text-xs text-muted dark:text-gray-500' }, String(index + 1)),
          team?.flag ? flagImg(team.flag, 20, 15, 'h-[15px] w-5 rounded-sm object-cover shrink-0') : null,
          h(
            'span',
            { class: 'font-medium text-primary dark:text-gray-100 truncate' },
            team?.name_en ?? `Team ${standing.team_id}`
          )
        )
      ),
      h('td', { class: 'px-2 py-2.5 text-center tabular-nums' }, standing.mp),
      h('td', { class: 'px-2 py-2.5 text-center tabular-nums' }, standing.w),
      h('td', { class: 'px-2 py-2.5 text-center tabular-nums' }, standing.d),
      h('td', { class: 'px-2 py-2.5 text-center tabular-nums' }, standing.l),
      h('td', { class: 'px-2 py-2.5 text-center tabular-nums' }, standing.gd),
      h('td', { class: 'px-3 py-2.5 text-center font-semibold tabular-nums text-accent' }, standing.pts)
    );
  });

  return h(
    'section',
    { class: 'rounded-lg border border-border dark:border-[#3d352d] bg-paper/50 dark:bg-[#2a2520]/50 overflow-hidden' },
    h(
      'header',
      { class: 'border-b border-border dark:border-[#3d352d] px-4 py-3' },
      h(
        'h3',
        { class: 'text-sm font-semibold uppercase tracking-wider text-primary dark:text-gray-100' },
        `Group ${group.name}`
      )
    ),
    h(
      'div',
      { class: 'overflow-x-auto' },
      h(
        'table',
        { class: 'min-w-full text-sm' },
        h(
          'thead',
          {},
          h(
            'tr',
            { class: 'text-left text-xs uppercase tracking-wider text-muted dark:text-gray-500' },
            headerCell('Team', 'px-4 py-2 font-medium'),
            headerCell('P', 'px-2 py-2 font-medium text-center'),
            headerCell('W', 'px-2 py-2 font-medium text-center'),
            headerCell('D', 'px-2 py-2 font-medium text-center'),
            headerCell('L', 'px-2 py-2 font-medium text-center'),
            headerCell('GD', 'px-2 py-2 font-medium text-center'),
            headerCell('Pts', 'px-3 py-2 font-medium text-center')
          )
        ),
        h('tbody', {}, ...rows)
      )
    )
  );
}

export function createChampionBanner(results: TournamentResults): HTMLElement {
  const { champion, thirdPlace } = results;

  const championBlock = h(
    'div',
    { class: 'mt-6 flex flex-col items-center gap-4 text-center' },
    champion.winner.flag
      ? flagImg(champion.winner.flag, 80, 60, 'h-14 w-20 rounded-md object-cover shadow-sm', true)
      : null,
    h(
      'h2',
      { id: 'champion-name', class: 'text-3xl sm:text-4xl font-bold text-primary dark:text-gray-100 font-serif' },
      champion.winner.name
    ),
    h(
      'p',
      { id: 'champion-score', class: 'text-lg text-primary/80 dark:text-gray-300 font-mono tabular-nums' },
      `Final: ${champion.score} vs ${champion.runnerUp.name}`
    )
  );

  const thirdPlaceBlock = thirdPlace
    ? h(
        'div',
        {
          id: 'third-place-banner',
          class: 'mt-6 border-t border-border/70 dark:border-[#3d352d]/70 pt-5 text-center',
        },
        h(
          'p',
          { class: 'text-xs font-semibold uppercase tracking-wider text-muted dark:text-gray-500' },
          'Third Place'
        ),
        h(
          'div',
          { class: 'mt-2 flex items-center justify-center gap-2' },
          thirdPlace.winner.flag ? flagImg(thirdPlace.winner.flag, 28, 21, 'h-[21px] w-7 rounded-sm object-cover') : null,
          h('p', { id: 'third-place-name', class: 'font-medium text-primary dark:text-gray-200' }, thirdPlace.winner.name),
          h(
            'span',
            { id: 'third-place-score', class: 'text-sm text-muted dark:text-gray-500 font-mono' },
            `(${thirdPlace.score})`
          )
        )
      )
    : null;

  return h(
    'section',
    {
      id: 'champion-banner',
      class: 'section-animate rounded-xl border border-accent/40 bg-gradient-to-br from-accent/10 via-paper/80 to-paper/50 dark:from-accent/15 dark:via-[#2a2520]/80 dark:to-[#1f1b18]/50 p-6 sm:p-8',
      'aria-label': 'Tournament champion',
    },
    h(
      'p',
      { class: 'text-center text-sm font-medium uppercase tracking-wider text-muted dark:text-gray-400' },
      'FIFA World Cup 2026 Champions'
    ),
    championBlock,
    thirdPlaceBlock
  );
}
