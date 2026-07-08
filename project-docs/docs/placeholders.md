# Placeholders

PlaceholderAPI placeholders use `onembcmi` as the expansion identifier.

The intended path shape is:

```text
%onembcmi_<plugin>.<type>.<specifics>%
```

The shared library registers the expansion when PlaceholderAPI is loaded. Use `global` for shared library placeholders:

```text
%onembcmi_global.status.loaded%
%onembcmi_global.plugins.count%
%onembcmi_global.runtime.count%
%onembcmi_global.features.enabled.count%
%onembcmi_global.features.lib.count%
%onembcmi_global.features.player-fun.count%
%onembcmi_global.features.staff.count%
%onembcmi_global.features.server-management.count%
%onembcmi_global.features.generic.count%
%onembcmi_global.cmi.version%
%onembcmi_global.cmilib.version%
%onembcmi_global.hooks.cmi.loaded%
%onembcmi_global.hooks.cmilib.loaded%
%onembcmi_global.hooks.luckperms.loaded%
%onembcmi_global.hooks.vault.loaded%
%onembcmi_global.placeholderapi.loaded%
%onembcmi_global.placeholderapi.registered%
%onembcmi_global.cache.size%
%onembcmi_global.cache.global.size%
%onembcmi_global.cache.plugins.size%
%onembcmi_global.playerdata.size%
```

AFKShrine placeholders:

```text
%onembcmi_afkshrine.enabled%
%onembcmi_afkshrine.style%
%onembcmi_afkshrine.style.name%
%onembcmi_afkshrine.styles.count%
%onembcmi_afkshrine.opted_in%
%onembcmi_afkshrine.points.balance%
%onembcmi_afkshrine.points.pending%
%onembcmi_afkshrine.points.lifetime%
%onembcmi_afkshrine.streak.current%
%onembcmi_afkshrine.streak.best%
%onembcmi_afkshrine.milestones.count%
%onembcmi_afkshrine.quests.count%
%onembcmi_afkshrine.biomes.count%
%onembcmi_afkshrine.events.count%
%onembcmi_afkshrine.progress.awards.count%
%onembcmi_afkshrine.rested.active%
%onembcmi_afkshrine.rested.seconds_left%
%onembcmi_afkshrine.rested.total_granted%
%onembcmi_afkshrine.sleep.active%
%onembcmi_afkshrine.sleep.last.seconds%
%onembcmi_afkshrine.sleep.last.points%
%onembcmi_afkshrine.sleep.last.reason%
%onembcmi_afkshrine.sleep.daily_left%
%onembcmi_afkshrine.sleep.total_sessions%
%onembcmi_afkshrine.sleep.total_seconds%
%onembcmi_afkshrine.repeat_zones.count%
%onembcmi_afkshrine.last.repeat_zone.count%
%onembcmi_afkshrine.last.danger.multiplier_percent%
%onembcmi_afkshrine.last.danger.candidate_points%
%onembcmi_afkshrine.last.danger.applied_points%
%onembcmi_afkshrine.seasonal.active.count%
%onembcmi_afkshrine.community.claimed_total%
%onembcmi_afkshrine.community.completed.count%
%onembcmi_afkshrine.community.celebration.active%
%onembcmi_afkshrine.community.celebration.id%
%onembcmi_afkshrine.community.celebration.seconds_left%
%onembcmi_afkshrine.last.session.seconds%
%onembcmi_afkshrine.last.session.points%
%onembcmi_afkshrine.is_afk%
%onembcmi_afkshrine.afk_seconds%
%onembcmi_afkshrine.active.count%
%onembcmi_afkshrine.preview.count%
%onembcmi_afkshrine.disabled.count%
%onembcmi_afkshrine.runtime.enters%
%onembcmi_afkshrine.runtime.leaves%
%onembcmi_afkshrine.runtime.kicks%
%onembcmi_afkshrine.runtime.afk_seconds_total%
%onembcmi_afkshrine.runtime.pending_points%
%onembcmi_afkshrine.runtime.claimed_points%
%onembcmi_afkshrine.runtime.traded_points%
%onembcmi_afkshrine.runtime.quest_completions%
%onembcmi_afkshrine.runtime.seasonal_quest_completions%
%onembcmi_afkshrine.runtime.community_milestones%
%onembcmi_afkshrine.runtime.rested_bonuses%
%onembcmi_afkshrine.runtime.repeat_zone_warnings%
%onembcmi_afkshrine.runtime.repeat_zone_hard_warnings%
%onembcmi_afkshrine.runtime.danger_bonus_candidates%
%onembcmi_afkshrine.runtime.danger_bonus_applied%
%onembcmi_afkshrine.runtime.tool_actions%
%onembcmi_afkshrine.runtime.sleep_sessions%
%onembcmi_afkshrine.runtime.sleep_seconds%
%onembcmi_afkshrine.runtime.sleep_points%
%onembcmi_afkshrine.tools.captured_items%
%onembcmi_afkshrine.tools.actions%
%onembcmi_afkshrine.tools.enabled_actions%
%onembcmi_afkshrine.cache.size%
```

RecordingMode placeholders:

```text
%onembcmi_recordingmode.enabled%
%onembcmi_recordingmode.active%
%onembcmi_recordingmode.preference.msg%
%onembcmi_recordingmode.preference.tpa%
%onembcmi_recordingmode.preference.money%
%onembcmi_recordingmode.preference.staffmsg%
%onembcmi_recordingmode.preference.notablemsg%
%onembcmi_recordingmode.preference.tips%
%onembcmi_recordingmode.preference.bluemap%
%onembcmi_recordingmode.active.count%
%onembcmi_recordingmode.cache.size%
```

SellStreaks placeholders:

```text
%onembcmi_sellstreaks.enabled%
%onembcmi_sellstreaks.date%
%onembcmi_sellstreaks.sell_events%
%onembcmi_sellstreaks.items%
%onembcmi_sellstreaks.payment%
%onembcmi_sellstreaks.unique_materials%
%onembcmi_sellstreaks.goals.completed%
%onembcmi_sellstreaks.goals.total%
%onembcmi_sellstreaks.next.variety.threshold%
%onembcmi_sellstreaks.one_item_spam_streak%
%onembcmi_sellstreaks.runtime.rewards%
%onembcmi_sellstreaks.runtime.reward_total%
%onembcmi_sellstreaks.cache.size%
```

ScheduledTips placeholders:

```text
%onembcmi_scheduledtips.enabled%
%onembcmi_scheduledtips.tips.count%
%onembcmi_scheduledtips.opted_out%
%onembcmi_scheduledtips.seen.total%
%onembcmi_scheduledtips.dismissed.count%
%onembcmi_scheduledtips.last_tip%
%onembcmi_scheduledtips.runtime.sent%
%onembcmi_scheduledtips.runtime.dismissed%
%onembcmi_scheduledtips.runtime.booster_reminders%
%onembcmi_scheduledtips.cache.size%
```

SocialGatherings placeholders:

```text
%onembcmi_socialgatherings.enabled%
%onembcmi_socialgatherings.opted_out%
%onembcmi_socialgatherings.types%
%onembcmi_socialgatherings.runtime.successes%
%onembcmi_socialgatherings.runtime.participants%
%onembcmi_socialgatherings.last.type%
%onembcmi_socialgatherings.last.players%
%onembcmi_socialgatherings.last.at%
%onembcmi_socialgatherings.cache.size%
```

JourneyMap placeholders:

```text
%onembcmi_journeymap.enabled%
%onembcmi_journeymap.playtime.seconds%
%onembcmi_journeymap.playtime.hours%
%onembcmi_journeymap.current.era%
%onembcmi_journeymap.current.badge%
%onembcmi_journeymap.milestones.earned.count%
%onembcmi_journeymap.milestones.total%
%onembcmi_journeymap.rewards.claimable.count%
%onembcmi_journeymap.rewards.claimed.count%
%onembcmi_journeymap.next.id%
%onembcmi_journeymap.next.remaining_seconds%
%onembcmi_journeymap.last.source%
%onembcmi_journeymap.runtime.earned%
%onembcmi_journeymap.runtime.rewards_claimed%
%onembcmi_journeymap.cache.size%
```

KitStreaks placeholders:

```text
%onembcmi_kitstreaks.enabled%
%onembcmi_kitstreaks.default.track%
%onembcmi_kitstreaks.current.streak%
%onembcmi_kitstreaks.current.best%
%onembcmi_kitstreaks.current.health%
%onembcmi_kitstreaks.claims.total%
%onembcmi_kitstreaks.tracks.count%
%onembcmi_kitstreaks.kits.count%
%onembcmi_kitstreaks.claimable.count%
%onembcmi_kitstreaks.claimed.count%
%onembcmi_kitstreaks.last.player%
%onembcmi_kitstreaks.last.kit%
%onembcmi_kitstreaks.last.track%
%onembcmi_kitstreaks.last.claimed_at%
%onembcmi_kitstreaks.track.<track>.streak%
%onembcmi_kitstreaks.track.<track>.best%
%onembcmi_kitstreaks.track.<track>.health%
%onembcmi_kitstreaks.kit.<kit>.streak%
%onembcmi_kitstreaks.kit.<kit>.best%
%onembcmi_kitstreaks.runtime.claims%
%onembcmi_kitstreaks.runtime.milestones%
%onembcmi_kitstreaks.runtime.rewards%
%onembcmi_kitstreaks.cache.size%
```

Dynamic examples:

```text
%onembcmi_kitstreaks.track.daily.streak%
%onembcmi_kitstreaks.track.daily.health%
%onembcmi_kitstreaks.kit.starter.best%
```

MessageFont placeholders:

```text
%onembcmi_messagefont.enabled%
%onembcmi_messagefont.current.font%
%onembcmi_messagefont.current.expires_at%
%onembcmi_messagefont.current.remaining_seconds%
%onembcmi_messagefont.plain.enabled%
%onembcmi_messagefont.fonts.count%
%onembcmi_messagefont.runtime.rewrites%
%onembcmi_messagefont.runtime.skipped%
%onembcmi_messagefont.last.player%
%onembcmi_messagefont.last.command%
%onembcmi_messagefont.last.rewrite_at%
%onembcmi_messagefont.cache.size%
```

Example checks:

```text
papi parse mrfloris %onembcmi_messagefont.current.font%
papi parse mrfloris %onembcmi_messagefont.plain.enabled%
papi parse mrfloris %onembcmi_messagefont.current.remaining_seconds%
```

Nick placeholders:

```text
%onembcmi_nick.enabled%
%onembcmi_nick.current.plain%
%onembcmi_nick.current.style%
%onembcmi_nick.current.formatted%
%onembcmi_nick.bio%
%onembcmi_nick.rating.average%
%onembcmi_nick.rating.count%
%onembcmi_nick.cooldown.name.seconds%
%onembcmi_nick.cooldown.style.seconds%
%onembcmi_nick.history.count%
%onembcmi_nick.favorites.count%
%onembcmi_nick.legacy.available%
%onembcmi_nick.legacy.restores_remaining%
%onembcmi_nick.current.legacy%
```

Example checks:

```text
papi parse mrfloris %onembcmi_nick.current.plain%
papi parse mrfloris %onembcmi_nick.current.style%
papi parse mrfloris %onembcmi_nick.rating.average%
papi parse mrfloris %onembcmi_nick.legacy.available%
```

EmoteMenu placeholders:

```text
%onembcmi_emotemenu.enabled%
%onembcmi_emotemenu.emotes.count%
%onembcmi_emotemenu.emotes.known.count%
%onembcmi_emotemenu.emotes.disabled.count%
%onembcmi_emotemenu.emotes.config.count%
%onembcmi_emotemenu.aliases.imported.count%
%onembcmi_emotemenu.aliases.enabled.count%
%onembcmi_emotemenu.aliases.files.count%
%onembcmi_emotemenu.aliases.missing.count%
%onembcmi_emotemenu.aliases.skipped.count%
%onembcmi_emotemenu.aliases.last_load%
%onembcmi_emotemenu.opens.count%
%onembcmi_emotemenu.actions.count%
%onembcmi_emotemenu.searches.count%
%onembcmi_emotemenu.last.emote%
%onembcmi_emotemenu.last.player%
%onembcmi_emotemenu.last.target%
%onembcmi_emotemenu.last.run_at%
%onembcmi_emotemenu.cache.size%
```

Example checks:

```text
papi parse mrfloris %onembcmi_emotemenu.emotes.count%
papi parse mrfloris %onembcmi_emotemenu.aliases.imported.count%
papi parse mrfloris %onembcmi_emotemenu.aliases.enabled.count%
papi parse mrfloris %onembcmi_emotemenu.last.emote%
papi parse mrfloris %onembcmi_emotemenu.actions.count%
```

PvPToggle placeholders:

```text
%onembcmi_pvptoggle.enabled%
%onembcmi_pvptoggle.pvp.enabled%
%onembcmi_pvptoggle.pvp.state%
%onembcmi_pvptoggle.pvp.state_text%
%onembcmi_pvptoggle.pvp.state_onoff%
%onembcmi_pvptoggle.pvp.state_color%
%onembcmi_pvptoggle.pvp.state_display%
%onembcmi_pvptoggle.cooldown.remaining%
%onembcmi_pvptoggle.runtime.enabled_count%
%onembcmi_pvptoggle.runtime.allowed%
%onembcmi_pvptoggle.runtime.blocked%
%onembcmi_pvptoggle.runtime.cmi_pvp_start%
%onembcmi_pvptoggle.runtime.cmi_pvp_end%
```

Legacy PvPToggle compatibility placeholders:

```text
%PvPToggle_pvp_state%
%PvPToggle_pvp_symbol%
%PvPToggle_pvp_state_clean%
%PvPToggle_pvp_enabled%
%PvPToggle_pvp_state_text%
%PvPToggle_pvp_state_onoff%
%PvPToggle_pvp_state_color%
%PvPToggle_pvp_state_display%
```

Example checks:

```text
papi parse mrfloris %onembcmi_pvptoggle.pvp.enabled%
papi parse mrfloris %onembcmi_pvptoggle.cooldown.remaining%
papi parse mrfloris %PvPToggle_pvp_enabled%
```

Boosters placeholders:

```text
%onembcmi_boosters.enabled%
%onembcmi_boosters.mcmmo.active%
%onembcmi_boosters.mcmmo.rate%
%onembcmi_boosters.mcmmo.time%
%onembcmi_boosters.mcmmo.timeleft%
%onembcmi_boosters.mcmmo.dependency%
%onembcmi_boosters.jobs.active%
%onembcmi_boosters.jobs.rate%
%onembcmi_boosters.jobs.time%
%onembcmi_boosters.jobs.timeleft%
%onembcmi_boosters.jobs.dependency%
%onembcmi_boosters.points.active%
%onembcmi_boosters.points.rate%
%onembcmi_boosters.points.time%
%onembcmi_boosters.points.timeleft%
%onembcmi_boosters.points.dependency%
%onembcmi_boosters.runtime.recent_actions%
%onembcmi_boosters.runtime.reminder_players%
```

Legacy Boosters compatibility placeholders:

```text
%onembboosters_mcmmo_active%
%onembboosters_mcmmo_rate%
%onembboosters_mcmmo_time%
%onembboosters_mcmmo_timeleft%
%onembboosters_jobs_active%
%onembboosters_jobs_rate%
%onembboosters_jobs_time%
%onembboosters_jobs_timeleft%
%onembboosters_points_active%
%onembboosters_points_rate%
%onembboosters_points_time%
%onembboosters_points_timeleft%
```

Example checks:

```text
papi parse mrfloris %onembcmi_boosters.mcmmo.active%
papi parse mrfloris %onembcmi_boosters.jobs.timeleft%
papi parse mrfloris %onembboosters_points_rate%
```

MobHat placeholders:

```text
%onembcmi_mobhat.enabled%
%onembcmi_mobhat.active%
%onembcmi_mobhat.active.type%
%onembcmi_mobhat.allowed.count%
%onembcmi_mobhat.runtime.active_count%
%onembcmi_mobhat.runtime.spawned%
%onembcmi_mobhat.runtime.removed%
%onembcmi_mobhat.runtime.alias_uses%
%onembcmi_mobhat.runtime.target_uses%
%onembcmi_mobhat.runtime.denied%
%onembcmi_mobhat.world.allowed%
%onembcmi_mobhat.position%
%onembcmi_mobhat.position.default%
%onembcmi_mobhat.position.preference%
%onembcmi_mobhat.position.testbed%
%onembcmi_mobhat.last.player%
%onembcmi_mobhat.last.type%
%onembcmi_mobhat.last.position%
```

Example checks:

```text
papi parse mrfloris %onembcmi_mobhat.active%
papi parse mrfloris %onembcmi_mobhat.active.type%
papi parse mrfloris %onembcmi_mobhat.runtime.spawned%
```

PlayerTodo placeholders:

```text
%onembcmi_todo.enabled%
%onembcmi_todo.open%
%onembcmi_todo.completed%
%onembcmi_todo.total%
%onembcmi_todo.limit%
%onembcmi_todo.remaining%
%onembcmi_todo.cooldown_seconds%
%onembcmi_todo.lifetime_completed%
%onembcmi_todo.latest%
%onembcmi_todo.latest_completed%
%onembcmi_todo.last.player%
%onembcmi_todo.last.action%
%onembcmi_todo.last.text%
%onembcmi_todo.runtime.added%
%onembcmi_todo.runtime.completed%
%onembcmi_todo.runtime.removed%
%onembcmi_todo.cache.size%
```

Example checks:

```text
papi parse mrfloris %onembcmi_todo.open%
papi parse mrfloris %onembcmi_todo.remaining%
papi parse mrfloris %onembcmi_todo.latest%
papi parse mrfloris %onembcmi_todo.lifetime_completed%
```

Refer placeholders:

```text
%onembcmi_refer.enabled%
%onembcmi_refer.claimed_referrer%
%onembcmi_refer.claimed_referred%
%onembcmi_refer.playtime.seconds%
%onembcmi_refer.eligible.referrer%
%onembcmi_refer.eligible.referred%
%onembcmi_refer.referrals.completed%
%onembcmi_refer.pending.count%
%onembcmi_refer.last.referrer%
%onembcmi_refer.last.referred%
%onembcmi_refer.last.result%
%onembcmi_refer.runtime.requests%
%onembcmi_refer.runtime.verified%
%onembcmi_refer.runtime.denied%
%onembcmi_refer.runtime.expired%
%onembcmi_refer.cache.size%
```

Example checks:

```text
papi parse mrfloris %onembcmi_refer.claimed_referrer%
papi parse mrfloris %onembcmi_refer.pending.count%
papi parse mrfloris %onembcmi_refer.eligible.referrer%
```

TPAuto placeholders:

```text
%onembcmi_tpauto.enabled%
%onembcmi_tpauto.active%
%onembcmi_tpauto.state%
%onembcmi_tpauto.cmi.accepting_tpa%
%onembcmi_tpauto.runtime.requests%
%onembcmi_tpauto.runtime.accepted%
%onembcmi_tpauto.runtime.skipped%
%onembcmi_tpauto.online.active.count%
%onembcmi_tpauto.last.requester%
%onembcmi_tpauto.last.target%
%onembcmi_tpauto.last.action%
%onembcmi_tpauto.last.result%
%onembcmi_tpauto.cache.size%
```

Example checks:

```text
papi parse mrfloris %onembcmi_tpauto.active%
papi parse mrfloris %onembcmi_tpauto.state%
papi parse mrfloris %onembcmi_tpauto.cmi.accepting_tpa%
```

Menu placeholders:

```text
%onembcmi_menu.enabled%
%onembcmi_menu.buttons.count%
%onembcmi_menu.pages%
%onembcmi_menu.opens%
%onembcmi_menu.actions%
%onembcmi_menu.blocked%
%onembcmi_menu.last.player%
%onembcmi_menu.last.action%
%onembcmi_menu.last.command%
%onembcmi_menu.cache.size%
```

Example checks:

```text
papi parse mrfloris %onembcmi_menu.enabled%
papi parse mrfloris %onembcmi_menu.buttons.count%
papi parse mrfloris %onembcmi_menu.pages%
```

NameMC placeholders:

```text
%onembcmi_namemc.enabled%
%onembcmi_namemc.server%
%onembcmi_namemc.vote_url%
%onembcmi_namemc.verify_url%
%onembcmi_namemc.liked%
%onembcmi_namemc.reward_claimed%
%onembcmi_namemc.verified%
%onembcmi_namemc.total_players%
%onembcmi_namemc.total_liked%
%onembcmi_namemc.total_rewarded%
%onembcmi_namemc.total_pending_rewards%
%onembcmi_namemc.last_rewarded_player%
%onembcmi_namemc.last_rewarded_at%
```

Legacy NameMC compatibility placeholders:

```text
%onembnamemc_server%
%onembnamemc_vote_url%
%onembnamemc_likes_url%
%onembnamemc_verify_url%
%onembnamemc_liked%
%onembnamemc_liked_raw%
%onembnamemc_liked_since%
%onembnamemc_last_checked%
%onembnamemc_reward_claimed%
%onembnamemc_reward_claimed_raw%
%onembnamemc_reward_claimed_at%
%onembnamemc_verified%
%onembnamemc_verified_raw%
%onembnamemc_version%
%onembnamemc_build%
%onembnamemc_cooldown_seconds%
%onembnamemc_total_players%
%onembnamemc_total_liked%
%onembnamemc_total_rewarded%
%onembnamemc_total_pending_rewards%
%onembnamemc_last_rewarded_player%
%onembnamemc_last_rewarded_at%
```

Example checks:

```text
papi parse mrfloris %onembnamemc_verified%
papi parse mrfloris %onembnamemc_reward_claimed_at%
papi parse mrfloris %onembcmi_namemc.total_rewarded%
```

Exchange placeholders:

```text
%onembcmi_exchange.enabled%
%onembcmi_exchange.exchanges_loaded%
%onembcmi_exchange.enabled_exchanges%
%onembcmi_exchange.tracked_players%
%onembcmi_exchange.visible_exchanges%
%onembcmi_exchange.ready_exchanges%
%onembcmi_exchange.completed_exchanges%
```

Exchange-specific placeholders:

```text
%onembexchange_version%
%onembexchange_build%
%onembexchange_exchanges_loaded%
%onembexchange_enabled_exchanges%
%onembexchange_tracked_players%
%onembexchange_visible_exchanges%
%onembexchange_ready_exchanges%
%onembexchange_completed_exchanges%
%onembexchange_exchange.<tradeId>%
%onembexchange_exchange.<tradeId>.status%
%onembexchange_exchange.<tradeId>.missing_summary%
%onembexchange_exchange.<tradeId>.can_exchange%
```

Example checks:

```text
papi parse mrfloris %onembcmi_exchange.ready_exchanges%
papi parse mrfloris %onembexchange_exchange.summer_event.status%
papi parse mrfloris %onembexchange_exchange.summer_event.missing_summary%
```

VoteTokens placeholders:

```text
%onembcmi_votetokens.current_tier%
%onembcmi_votetokens.current_layer%
%onembcmi_votetokens.completed_items%
%onembcmi_votetokens.total_items%
%onembcmi_votetokens.completed_layers%
%onembcmi_votetokens.total_layers%
%onembcmi_votetokens.progress_percent%
%onembcmi_votetokens.next_unlock%
%onembcmi_votetokens.tokens_required%
%onembcmi_votetokens.token.diamond.count%
%onembcmi_votetokens.extra_token.lapis.count%
```

Example checks:

```text
papi parse mrfloris %onembcmi_votetokens.current_tier%
papi parse mrfloris %onembcmi_votetokens.next_unlock%
papi parse mrfloris %onembcmi_votetokens.token.diamond.count%
papi parse mrfloris %onembcmi_votetokens.extra_token.lapis.count%
```

DiscordChat placeholders:

```text
%onembcmi_discordchat_points%
%onembcmi_discordchat_pending_exp%
%onembcmi_discordchat_streak%
%onembcmi_discordchat_longest_streak%
%onembcmi_discordchat_next_milestone%
%onembcmi_discordchat_milestones_completed%
%onembcmi_discordchat_words%
%onembcmi_discordchat_emotes%
%onembcmi_discordchat_messages%
%onembcmi_discordchat_linked%
%onembcmi_discordchat_opted_out%
%onembcmi_discordchat_prefix%
%onembcmi_discordchat_suffix%
%onembcmi_discordchat_event_active%
%onembcmi_discordchat_event_multiplier%
%onembcmi_discordchat_event_timeleft%
```

Example checks:

```text
papi parse mrfloris %onembcmi_discordchat_points%
papi parse mrfloris %onembcmi_discordchat_streak%
papi parse mrfloris %onembcmi_discordchat_next_milestone%
papi parse mrfloris %onembcmi_discordchat_event_active%
```

GameTypes placeholders:

```text
%onembcmi_gametypes_detected%
%onembcmi_gametypes_world%
%onembcmi_gametypes_enabled_count%
%onembcmi_gametypes_last_opened%
```

Example checks:

```text
papi parse mrfloris %onembcmi_gametypes_detected%
papi parse mrfloris %onembcmi_gametypes_world%
```

PassportDiscovery placeholders:

```text
%onembcmi_passportdiscovery.enabled%
%onembcmi_passportdiscovery.total.stamps%
%onembcmi_passportdiscovery.world.stamps%
%onembcmi_passportdiscovery.world.progress_percent%
%onembcmi_passportdiscovery.warp.stamps%
%onembcmi_passportdiscovery.warp.known%
%onembcmi_passportdiscovery.warp.missing%
%onembcmi_passportdiscovery.warp.last%
%onembcmi_passportdiscovery.warp.visits%
%onembcmi_passportdiscovery.warp.progress_percent%
%onembcmi_passportdiscovery.warp.runtime.stamps%
%onembcmi_passportdiscovery.warp.runtime.new_stamps%
%onembcmi_passportdiscovery.visit.stamps%
%onembcmi_passportdiscovery.visit.progress_percent%
%onembcmi_passportdiscovery.biome.stamps%
%onembcmi_passportdiscovery.biome.progress_percent%
%onembcmi_passportdiscovery.block.stamps%
%onembcmi_passportdiscovery.block.progress_percent%
%onembcmi_passportdiscovery.item.stamps%
%onembcmi_passportdiscovery.item.progress_percent%
%onembcmi_passportdiscovery.consume.stamps%
%onembcmi_passportdiscovery.consume.progress_percent%
%onembcmi_passportdiscovery.tool.stamps%
%onembcmi_passportdiscovery.tool.progress_percent%
%onembcmi_passportdiscovery.weapon.stamps%
%onembcmi_passportdiscovery.weapon.progress_percent%
%onembcmi_passportdiscovery.armor.stamps%
%onembcmi_passportdiscovery.armor.progress_percent%
%onembcmi_passportdiscovery.kill.stamps%
%onembcmi_passportdiscovery.kill.progress_percent%
%onembcmi_passportdiscovery.mount.stamps%
%onembcmi_passportdiscovery.mount.progress_percent%
%onembcmi_passportdiscovery.explore.stamps%
%onembcmi_passportdiscovery.explore.progress_percent%
%onembcmi_passportdiscovery.runtime.new_stamps%
%onembcmi_passportdiscovery.cache.size%
```

Visit placeholders:

```text
%onembcmi_visit.enabled%
%onembcmi_visit.total%
%onembcmi_visit.has_visit%
%onembcmi_visit.warp%
%onembcmi_visit.welcome%
%onembcmi_visit.title%
%onembcmi_visit.subtitle%
%onembcmi_visit.particle_preset%
%onembcmi_visit.sound_preset%
%onembcmi_visit.arrival_enabled%
%onembcmi_visit.arrival_unlocked%
%onembcmi_visit.offline_allowed%
%onembcmi_visit.money_charging%
%onembcmi_visit.visits%
%onembcmi_visit.last_visited_by%
%onembcmi_visit.runtime.teleports%
%onembcmi_visit.cache.size%
```

BirthdayLanterns placeholders:

```text
%onembcmi_birthdaylanterns.enabled%
%onembcmi_birthdaylanterns.birthday_set%
%onembcmi_birthdaylanterns.birthday_date%
%onembcmi_birthdaylanterns.visibility%
%onembcmi_birthdaylanterns.available.count%
%onembcmi_birthdaylanterns.claimed.count%
%onembcmi_birthdaylanterns.player_anniversary.years%
%onembcmi_birthdaylanterns.server.years%
```

Collect placeholders:

```text
%onembcmi_collect.event.id%
%onembcmi_collect.event.name%
%onembcmi_collect.event.theme%
%onembcmi_collect.event.open%
%onembcmi_collect.event.claim_open%
%onembcmi_collect.event.start_date%
%onembcmi_collect.event.end_date%
%onembcmi_collect.event.claim_until%
%onembcmi_collect.event.days%
%onembcmi_collect.current.date%
%onembcmi_collect.current.day%
%onembcmi_collect.current.day_display%
%onembcmi_collect.current.week%
%onembcmi_collect.current.week_name%
%onembcmi_collect.current.week_items%
%onembcmi_collect.current.week_items_count%
%onembcmi_collect.current.week_item.1%
%onembcmi_collect.current.period.daily%
%onembcmi_collect.current.period.weekly%
%onembcmi_collect.current.period.monthly%
%onembcmi_collect.current.period.alltime%
%onembcmi_collect.community.score%
%onembcmi_collect.community.score_formatted%
%onembcmi_collect.community.target%
%onembcmi_collect.community.target_formatted%
%onembcmi_collect.community.percent%
%onembcmi_collect.community.booster_unlocked%
%onembcmi_collect.community.booster%
%onembcmi_collect.scavenger.active%
%onembcmi_collect.scavenger.item%
%onembcmi_collect.scavenger.item_name%
%onembcmi_collect.scavenger.multiplier%
%onembcmi_collect.scavenger.minutes_left%
%onembcmi_collect.scavenger.ends_at%
%onembcmi_collect.player.score.daily%
%onembcmi_collect.player.score.weekly%
%onembcmi_collect.player.score.monthly%
%onembcmi_collect.player.score.alltime%
%onembcmi_collect.player.rank.daily%
%onembcmi_collect.player.rank.weekly%
%onembcmi_collect.player.rank.monthly%
%onembcmi_collect.player.rank.alltime%
%onembcmi_collect.player.rank.daily.display%
%onembcmi_collect.player.rank.weekly.display%
%onembcmi_collect.player.rank.monthly.display%
%onembcmi_collect.player.rank.alltime.display%
%onembcmi_collect.player.streak.current%
%onembcmi_collect.player.streak.best%
%onembcmi_collect.player.participation_days%
%onembcmi_collect.player.lucky_finds%
%onembcmi_collect.player.lucky_finds.today%
%onembcmi_collect.player.lucky_points%
%onembcmi_collect.player.lucky_points_formatted%
%onembcmi_collect.player.last_submit_date%
%onembcmi_collect.participants.daily%
%onembcmi_collect.participants.weekly%
%onembcmi_collect.participants.monthly%
%onembcmi_collect.participants.alltime%
%onembcmi_collect.top.daily.1.line%
%onembcmi_collect.top.daily.1.name%
%onembcmi_collect.top.daily.1.score%
%onembcmi_collect.top.daily.1.score_formatted%
%onembcmi_collect.top.weekly.1.line%
%onembcmi_collect.top.monthly.1.line%
%onembcmi_collect.top.alltime.1.line%
```

Forage placeholders:

```text
%onembcmi_forage.enabled%
%onembcmi_forage.player.level%
%onembcmi_forage.player.xp%
%onembcmi_forage.player.xp_formatted%
%onembcmi_forage.player.points%
%onembcmi_forage.player.actions%
%onembcmi_forage.player.treasures%
%onembcmi_forage.player.today.xp%
%onembcmi_forage.player.today.actions%
%onembcmi_forage.player.today.xp_remaining%
%onembcmi_forage.player.today.actions_remaining%
%onembcmi_forage.player.today.xp_percent%
%onembcmi_forage.player.today.actions_percent%
%onembcmi_forage.player.daily_xp_cap%
%onembcmi_forage.player.daily_action_cap%
%onembcmi_forage.balance.preset%
%onembcmi_forage.player.camp.ready%
%onembcmi_forage.player.camp.anchor%
%onembcmi_forage.player.camp.owner%
%onembcmi_forage.player.camp.missing_count%
%onembcmi_forage.player.tool.id%
%onembcmi_forage.player.tool.name%
%onembcmi_forage.player.tool.tier%
%onembcmi_forage.player.tool.level%
%onembcmi_forage.player.tool.xp%
%onembcmi_forage.player.tool.uses%
%onembcmi_forage.player.tool.durability%
%onembcmi_forage.player.tool.durability_percent%
%onembcmi_forage.player.tool.locked%
%onembcmi_forage.player.branch.id%
%onembcmi_forage.player.branch.name%
%onembcmi_forage.player.branch.xp%
%onembcmi_forage.player.branch.actions%
%onembcmi_forage.player.branch.treasures%
%onembcmi_forage.player.family.<id>.xp%
%onembcmi_forage.player.family.<id>.actions%
%onembcmi_forage.player.family.<id>.xp_remaining%
%onembcmi_forage.player.family.<id>.actions_remaining%
%onembcmi_forage.player.family.<id>.capped%
%onembcmi_forage.player.quests.daily.completed%
%onembcmi_forage.player.quests.daily.claimable%
%onembcmi_forage.player.quests.weekly.completed%
%onembcmi_forage.player.quests.weekly.claimable%
%onembcmi_forage.player.quests.monthly.completed%
%onembcmi_forage.player.quests.monthly.claimable%
%onembcmi_forage.player.quest.next.name%
%onembcmi_forage.player.quest.next.progress%
%onembcmi_forage.player.quest.next.target%
%onembcmi_forage.player.quest.next.remaining%
%onembcmi_forage.player.quest.next.claimable%
%onembcmi_forage.player.quest.daily.<id>.progress%
%onembcmi_forage.player.quest.daily.<id>.target%
%onembcmi_forage.player.quest.daily.<id>.claimable%
%onembcmi_forage.player.quest.weekly.<id>.progress%
%onembcmi_forage.player.quest.weekly.<id>.target%
%onembcmi_forage.player.quest.weekly.<id>.claimable%
%onembcmi_forage.player.quest.monthly.<id>.progress%
%onembcmi_forage.player.quest.monthly.<id>.target%
%onembcmi_forage.player.quest.monthly.<id>.claimable%
%onembcmi_forage.player.rank.level%
%onembcmi_forage.player.rank.points%
%onembcmi_forage.player.rank.daily%
%onembcmi_forage.player.rank.weekly%
%onembcmi_forage.top.<board>.<rank>.name%
%onembcmi_forage.top.<board>.<rank>.value%
%onembcmi_forage.runtime.earned_actions%
%onembcmi_forage.runtime.exhausted_actions%
%onembcmi_forage.runtime.treasures%
%onembcmi_forage.runtime.compost_turnins%
%onembcmi_forage.runtime.compost_items%
%onembcmi_forage.runtime.tracked_chunks%
%onembcmi_forage.runtime.exhausted_chunks%
```

StaffCenter placeholders:

```text
%onembcmi_staffcenter.enabled%
%onembcmi_staffcenter.last_lookup%
%onembcmi_staffcenter.last_lookup_online%
%onembcmi_staffcenter.last_lookup_section%
%onembcmi_staffcenter.last_lookup_by%
%onembcmi_staffcenter.recent.count%
%onembcmi_staffcenter.total.count%
%onembcmi_staffcenter.recent.summary.count%
%onembcmi_staffcenter.total.summary.count%
%onembcmi_staffcenter.cache.size%
```

Profile placeholders:

```text
%onembcmi_profile.enabled%
%onembcmi_profile.last.target%
%onembcmi_profile.last.uuid%
%onembcmi_profile.last.result%
%onembcmi_profile.lookup.count%
%onembcmi_profile.remote.count%
%onembcmi_profile.public_banlists.enabled%
%onembcmi_profile.public_banlists.last.signals%
%onembcmi_profile.public_banlists.last.matches%
%onembcmi_profile.cache.size%
```

FilterLab placeholders:

```text
%onembcmi_filterlab.enabled%
%onembcmi_filterlab.rules.count%
%onembcmi_filterlab.rules.enabled_count%
%onembcmi_filterlab.tests.count%
%onembcmi_filterlab.matches.count%
%onembcmi_filterlab.paper_chat.count%
%onembcmi_filterlab.cmi_filter.count%
%onembcmi_filterlab.cmi_caps.count%
%onembcmi_filterlab.last_tester%
%onembcmi_filterlab.last_result%
%onembcmi_filterlab.cache.size%
```

FilterGuard placeholders:

```text
%onembcmi_filterguard.enabled%
%onembcmi_filterguard.rules.count%
%onembcmi_filterguard.rules.enabled_count%
%onembcmi_filterguard.checks.count%
%onembcmi_filterguard.matches.count%
%onembcmi_filterguard.cancelled.count%
%onembcmi_filterguard.alerted.count%
%onembcmi_filterguard.last.surface%
%onembcmi_filterguard.last.rule%
%onembcmi_filterguard.last.player%
%onembcmi_filterguard.cache.size%
```

WarningLens placeholders:

```text
%onembcmi_warninglens.enabled%
%onembcmi_warninglens.recent.count%
%onembcmi_warninglens.total.count%
%onembcmi_warninglens.last.type%
%onembcmi_warninglens.last.player%
%onembcmi_warninglens.last.actor%
%onembcmi_warninglens.last.detail%
%onembcmi_warninglens.warning_count%
%onembcmi_warninglens.warning_points%
%onembcmi_warninglens.recent.warn.count%
%onembcmi_warninglens.total.warn.count%
%onembcmi_warninglens.cache.size%
```

NotableMsg placeholders:

```text
%onembcmi_notablemsg.enabled%
%onembcmi_notablemsg.toggled%
%onembcmi_notablemsg.runtime.sent%
%onembcmi_notablemsg.runtime.discord_sent%
%onembcmi_notablemsg.last.sender%
%onembcmi_notablemsg.last.message%
%onembcmi_notablemsg.last.sent_at%
%onembcmi_notablemsg.discordsrv.enabled%
%onembcmi_notablemsg.discordsrv.command_available%
%onembcmi_notablemsg.discord_to_minecraft.enabled%
%onembcmi_notablemsg.discord_to_minecraft.available%
%onembcmi_notablemsg.discord_to_minecraft.channel%
%onembcmi_notablemsg.cache.size%
```

1MBStaffMsg placeholders:

```text
%onembcmi_staffmsg.enabled%
%onembcmi_staffmsg.recent.count%
%onembcmi_staffmsg.runtime.recorded%
%onembcmi_staffmsg.last.sender%
%onembcmi_staffmsg.last.message%
%onembcmi_staffmsg.last.sent_at%
%onembcmi_staffmsg.persistent.capture.enabled%
%onembcmi_staffmsg.persistent.active%
%onembcmi_staffmsg.persistent.count%
%onembcmi_staffmsg.chat_shorthand.enabled%
%onembcmi_staffmsg.console_forward.enabled%
%onembcmi_staffmsg.discord_to_minecraft.enabled%
%onembcmi_staffmsg.discord_to_minecraft.available%
%onembcmi_staffmsg.discordsrv_outbound.enabled%
%onembcmi_staffmsg.cache.size%
```

CmdCostDashboard placeholders:

```text
%onembcmi_cmdcostdashboard.enabled%
%onembcmi_cmdcostdashboard.configured.count%
%onembcmi_cmdcostdashboard.observed.count%
%onembcmi_cmdcostdashboard.commands.count%
%onembcmi_cmdcostdashboard.fees.count%
%onembcmi_cmdcostdashboard.fees.total%
%onembcmi_cmdcostdashboard.last.result%
%onembcmi_cmdcostdashboard.last.issues.count%
%onembcmi_cmdcostdashboard.last.too_cheap.count%
%onembcmi_cmdcostdashboard.last.too_expensive.count%
%onembcmi_cmdcostdashboard.last.confusion.count%
%onembcmi_cmdcostdashboard.cache.size%
```

CMIConfig placeholders:

```text
%onembcmi_cmiconfig.enabled%
%onembcmi_cmiconfig.profiles.count%
%onembcmi_cmiconfig.toggles.count%
%onembcmi_cmiconfig.last.action%
%onembcmi_cmiconfig.cache.size%
```

ConsoleNoiseRouter placeholders:

```text
%onembcmi_consolenoiserouter.enabled%
%onembcmi_consolenoiserouter.last_level%
%onembcmi_consolenoiserouter.last_rule%
%onembcmi_consolenoiserouter.last_message%
%onembcmi_consolenoiserouter.last_test%
%onembcmi_consolenoiserouter.last_cmi_time%
%onembcmi_consolenoiserouter.recent.count%
%onembcmi_consolenoiserouter.total.count%
%onembcmi_consolenoiserouter.recent.error.count%
%onembcmi_consolenoiserouter.recent.warn.count%
%onembcmi_consolenoiserouter.count.error%
%onembcmi_consolenoiserouter.count.warn%
%onembcmi_consolenoiserouter.count.debug%
%onembcmi_consolenoiserouter.count.ignored%
%onembcmi_consolenoiserouter.count.info%
%onembcmi_consolenoiserouter.cache.size%
```

EconomyGuardian placeholders:

```text
%onembcmi_economyguardian.enabled%
%onembcmi_economyguardian.events.count%
%onembcmi_economyguardian.anomalies.count%
%onembcmi_economyguardian.players.count%
%onembcmi_economyguardian.positive.total%
%onembcmi_economyguardian.negative.total%
%onembcmi_economyguardian.last.player%
%onembcmi_economyguardian.last.delta%
%onembcmi_economyguardian.last.signal%
%onembcmi_economyguardian.cache.size%
```

StartupDoctor placeholders:

```text
%onembcmi_startupdoctor.enabled%
%onembcmi_startupdoctor.last.result%
%onembcmi_startupdoctor.last.reason%
%onembcmi_startupdoctor.warnings.count%
%onembcmi_startupdoctor.features.count%
%onembcmi_startupdoctor.cmi.version%
%onembcmi_startupdoctor.cmilib.version%
%onembcmi_startupdoctor.java.version%
%onembcmi_startupdoctor.paper.version%
%onembcmi_startupdoctor.cmiapi.usable%
%onembcmi_startupdoctor.cmilib.usable%
%onembcmi_startupdoctor.placeholderapi.loaded%
%onembcmi_startupdoctor.luckperms.loaded%
%onembcmi_startupdoctor.vault.loaded%
%onembcmi_startupdoctor.cache.size%
```

UpdateSmoke placeholders:

```text
%onembcmi_updatesmoke.enabled%
%onembcmi_updatesmoke.last.result%
%onembcmi_updatesmoke.last.reason%
%onembcmi_updatesmoke.last.checks%
%onembcmi_updatesmoke.last.passed%
%onembcmi_updatesmoke.last.warnings%
%onembcmi_updatesmoke.last.failures%
%onembcmi_updatesmoke.commands.ok%
%onembcmi_updatesmoke.commands.total%
%onembcmi_updatesmoke.command_smoke.ok%
%onembcmi_updatesmoke.command_smoke.total%
%onembcmi_updatesmoke.placeholders.ok%
%onembcmi_updatesmoke.placeholders.total%
%onembcmi_updatesmoke.features.count%
%onembcmi_updatesmoke.cache.size%
```

PluginVersions placeholders:

```text
%onembcmi_pluginversions.enabled%
%onembcmi_pluginversions.total%
%onembcmi_pluginversions.enabled.count%
%onembcmi_pluginversions.disabled.count%
%onembcmi_pluginversions.database.tracked%
%onembcmi_pluginversions.database.file%
%onembcmi_pluginversions.exports.directory%
%onembcmi_pluginversions.gate.status%
%onembcmi_pluginversions.gate.issues.count%
%onembcmi_pluginversions.gate.warnings.count%
%onembcmi_pluginversions.placeholderapi.registered%
%pluginversions_total%
%pluginversions_plugin_count%
%pluginversions_enabled%
%pluginversions_enabled_count%
%pluginversions_disabled%
%pluginversions_disabled_count%
%pluginversions_database_tracked%
%pluginversions_tracked%
%pluginversions_gate_status%
%pluginversions_gate_issues_count%
%pluginversions_gate_warnings_count%
%pluginversions_version_<plugin>%
%pluginversions_url_<plugin>_<type>%
```

EventRecorder placeholders:

```text
%onembcmi_eventrecorder.enabled%
%onembcmi_eventrecorder.recording%
%onembcmi_eventrecorder.recent.count%
%onembcmi_eventrecorder.total.count%
%onembcmi_eventrecorder.active.count%
%onembcmi_eventrecorder.last.event%
%onembcmi_eventrecorder.last.sequence%
%onembcmi_eventrecorder.last.class%
%onembcmi_eventrecorder.last.cancelled%
%onembcmi_eventrecorder.last.async%
%onembcmi_eventrecorder.last.detail%
%onembcmi_eventrecorder.recent.warp.count%
%onembcmi_eventrecorder.total.warp.count%
%onembcmi_eventrecorder.cache.size%
```

CMIProbe placeholders:

```text
%onembcmi_cmiprobe.enabled%
%onembcmi_cmiprobe.last.result%
%onembcmi_cmiprobe.managers.ok%
%onembcmi_cmiprobe.managers.total%
%onembcmi_cmiprobe.events.discovered%
%onembcmi_cmiprobe.events.with_listeners%
%onembcmi_cmiprobe.commands.ok%
%onembcmi_cmiprobe.commands.total%
%onembcmi_cmiprobe.last.command%
%onembcmi_cmiprobe.last.command.state%
%onembcmi_cmiprobe.scheduler.runs%
%onembcmi_cmiprobe.cache.size%
```

CMIDatabase placeholders:

```text
%onembcmi_cmidb.enabled%
%onembcmi_cmidb.global.<key>%
%onembcmi_cmidb.global.has.<key>%
%onembcmi_cmidb.player.<key>%
%onembcmi_cmidb.player.has.<key>%
%onembcmi_cmidb.count.global%
%onembcmi_cmidb.count.players%
%onembcmi_cmidb.cache.size%
%onembcmidb_<key>%
%onembcmidb_global_<key>%
%onembcmidb_has_<key>%
```

Example player-scoped keys:

```text
%onembcmi_cmidb.player.quest.bridge.started%
%onembcmi_cmidb.player.quest.bridge.done%
```

PlaceholderProbe placeholders:

```text
%onembcmi_placeholderprobe.enabled%
%onembcmi_placeholderprobe.placeholderapi.loaded%
%onembcmi_placeholderprobe.identifiers.count%
%onembcmi_placeholderprobe.recent.count%
%onembcmi_placeholderprobe.last.input%
%onembcmi_placeholderprobe.last.output%
%onembcmi_placeholderprobe.last.state%
%onembcmi_placeholderprobe.last.target%
%onembcmi_placeholderprobe.last.elapsed_micros%
%onembcmi_placeholderprobe.last.error%
%onembcmi_placeholderprobe.last.changed%
%onembcmi_placeholderprobe.recent.changed.count%
%onembcmi_placeholderprobe.recent.unchanged.count%
%onembcmi_placeholderprobe.recent.unresolved.count%
%onembcmi_placeholderprobe.recent.empty.count%
%onembcmi_placeholderprobe.recent.error.count%
%onembcmi_placeholderprobe.cache.size%
```

PermissionProbe placeholders:

```text
%onembcmi_permissionprobe.enabled%
%onembcmi_permissionprobe.last.player%
%onembcmi_permissionprobe.last.subject%
%onembcmi_permissionprobe.last.result%
%onembcmi_permissionprobe.permissions.count%
%onembcmi_permissionprobe.denials.distinct%
%onembcmi_permissionprobe.denials.total%
%onembcmi_permissionprobe.denials.last.sender%
%onembcmi_permissionprobe.denials.last.feature%
%onembcmi_permissionprobe.denials.last.permission%
%onembcmi_permissionprobe.denials.last.command%
%onembcmi_permissionprobe.cache.size%
```

PlaceholderHealth placeholders:

```text
%onembcmi_placeholderhealth.enabled%
%onembcmi_placeholderhealth.placeholderapi.loaded%
%onembcmi_placeholderhealth.samples.count%
%onembcmi_placeholderhealth.last.status%
%onembcmi_placeholderhealth.last.ok%
%onembcmi_placeholderhealth.last.warn%
%onembcmi_placeholderhealth.last.error%
%onembcmi_placeholderhealth.last.target%
%onembcmi_placeholderhealth.checks.run%
%onembcmi_placeholderhealth.exports.written%
```

CMIPlaceholderCheck placeholders:

```text
%onembcmi_cmiplaceholders.enabled%
%onembcmi_cmiplaceholders.catalog.count%
%onembcmi_cmiplaceholders.placeholderapi.loaded%
%onembcmi_cmiplaceholders.identifiers.count%
%onembcmi_cmiplaceholders.last.keyword%
%onembcmi_cmiplaceholders.last.matches%
%onembcmi_cmiplaceholders.last.example.placeholder%
%onembcmi_cmiplaceholders.last.example.output%
%onembcmi_cmiplaceholders.last.example.state%
%onembcmi_cmiplaceholders.cache.size%
```

1MBPlaceholders public PlaceholderAPI expansion:

```text
%onemb_<key>%
%onemb_1mb_version%
%onemb_1mb_staff%
%onemb_server_name%
%onemb_server_ip%
%onemb_server_altip%
%onemb_server_short%
%onemb_server_tag%
%onemb_server_status%
%onemb_brand_color%
%onemb_header%
%onemb_footer%
%onemb_plugin_version%
%onemb_plugin_build%
%onemb_mc_version%
%onemb_java_version%
%onemb_paper_version%
%onemb_server_engine%
%onemb_online_players%
%onemb_max_players%
%onemb_day_name%
%onemb_day_of_week%
%onemb_day_of_month%
%onemb_month_name%
%onemb_month_number%
%onemb_year%
%onemb_date_iso%
%onemb_time_24h%
%onemb_event_name%
%onemb_event_status%
%onemb_rotating_greeting%
```

1MBPlaceholders support/debug placeholders:

```text
%onembcmi_onembplaceholders.enabled%
%onembcmi_onembplaceholders.placeholderapi.registered%
%onembcmi_onembplaceholders.configured.count%
%onembcmi_onembplaceholders.live.count%
%onembcmi_onembplaceholders.categories.count%
%onembcmi_onembplaceholders.categories.enabled%
%onembcmi_onembplaceholders.categories.disabled%
%onembcmi_onembplaceholders.validation.count%
%onembcmi_onembplaceholders.last.load%
%onembcmi_onembplaceholders.backups.count%
%onembcmi_onembplaceholders.cache.size%
```

Upgrade placeholders:

```text
%onembcmi_upgrade.enabled%
%onembcmi_upgrade.groups.count%
%onembcmi_upgrade.transitions.count%
%onembcmi_upgrade.runtime.suggestions%
%onembcmi_upgrade.runtime.applied%
%onembcmi_upgrade.last.suggestion%
%onembcmi_upgrade.last.applied%
%onembcmi_upgrade.cache.size%
```

EndCrystals placeholders:

```text
%onembcmi_endcrystals.enabled%
%onembcmi_endcrystals.protection.block_damage%
%onembcmi_endcrystals.protection.player_break%
%onembcmi_endcrystals.protection.projectile_break%
%onembcmi_endcrystals.protection.entity_damage%
%onembcmi_endcrystals.protection.allow_end_break%
%onembcmi_endcrystals.protection.clear_yield%
%onembcmi_endcrystals.runtime.block_events%
%onembcmi_endcrystals.runtime.break_blocks%
%onembcmi_endcrystals.runtime.entity_blocks%
%onembcmi_endcrystals.runtime.tracked_explosions%
%onembcmi_endcrystals.protected_types.count%
```

WorldSnapshot placeholders:

```text
%onembcmi_worldsnapshot.enabled%
%onembcmi_worldsnapshot.worlds.count%
%onembcmi_worldsnapshot.entries.count%
%onembcmi_worldsnapshot.gamerules.count%
%onembcmi_worldsnapshot.cmi.entries.count%
%onembcmi_worldsnapshot.last.reason%
%onembcmi_worldsnapshot.last.time%
%onembcmi_worldsnapshot.last.diffs.count%
%onembcmi_worldsnapshot.cache.size%
```

SparkReviewer placeholders:

```text
%onembcmi_sparkreviewer.enabled%
%onembcmi_sparkreviewer.last.reason%
%onembcmi_sparkreviewer.last.concerns.count%
%onembcmi_sparkreviewer.last.tps.1m%
%onembcmi_sparkreviewer.last.mspt.avg%
%onembcmi_sparkreviewer.last.entities.total%
%onembcmi_sparkreviewer.last.hoppers.loaded%
%onembcmi_sparkreviewer.last.spark.urls.count%
%onembcmi_sparkreviewer.snapshots.count%
%onembcmi_sparkreviewer.cache.size%
```

Hoppers placeholders:

```text
%onembcmi_hoppers.enabled%
%onembcmi_hoppers.last.reason%
%onembcmi_hoppers.last.tps.1m%
%onembcmi_hoppers.last.mspt.avg%
%onembcmi_hoppers.last.hoppers.total%
%onembcmi_hoppers.last.hoppers.full%
%onembcmi_hoppers.last.hoppers.clogged%
%onembcmi_hoppers.last.chunks.hotspots%
%onembcmi_hoppers.last.config.signals%
%onembcmi_hoppers.tracking.active%
%onembcmi_hoppers.watch.active%
%onembcmi_hoppers.trigger.armed%
%onembcmi_hoppers.baseline.active%
%onembcmi_hoppers.baseline.samples%
%onembcmi_hoppers.notes.count%
%onembcmi_hoppers.spark.attachments.count%
%onembcmi_hoppers.history.entries%
%onembcmi_hoppers.cache.size%
```

Diagnostics placeholders:

```text
%onembcmi_diagnostics.enabled%
%onembcmi_diagnostics.debug_disconnected.enabled%
%onembcmi_diagnostics.disconnects.recent.count%
%onembcmi_diagnostics.disconnects.last.player%
%onembcmi_diagnostics.disconnects.last.reason%
%onembcmi_diagnostics.log.file%
```

WarpAudit placeholders:

```text
%onembcmi_warpaudit.enabled%
%onembcmi_warpaudit.last.result%
%onembcmi_warpaudit.warps.count%
%onembcmi_warpaudit.portals.count%
%onembcmi_warpaudit.issues.count%
%onembcmi_warpaudit.portal_issues.count%
%onembcmi_warpaudit.missing_worlds.count%
%onembcmi_warpaudit.unloaded_chunks.count%
%onembcmi_warpaudit.unsafe_landings.count%
%onembcmi_warpaudit.duplicate_locations.count%
%onembcmi_warpaudit.hidden.count%
%onembcmi_warpaudit.permission_required.count%
%onembcmi_warpaudit.portal_disabled.count%
%onembcmi_warpaudit.portal_empty_actions.count%
%onembcmi_warpaudit.portal_unsafe_destinations.count%
%onembcmi_warpaudit.cache.size%
```

WorthDrift placeholders:

```text
%onembcmi_worthdrift.enabled%
%onembcmi_worthdrift.events.count%
%onembcmi_worthdrift.items.count%
%onembcmi_worthdrift.payment.total%
%onembcmi_worthdrift.materials.count%
%onembcmi_worthdrift.ignored.count%
%onembcmi_worthdrift.last.result%
%onembcmi_worthdrift.last.issues.count%
%onembcmi_worthdrift.last.drift.count%
%onembcmi_worthdrift.last.high_value.count%
%onembcmi_worthdrift.last.concentration.count%
%onembcmi_worthdrift.shopgui.last.result%
%onembcmi_worthdrift.shopgui.last.drift.count%
%onembcmi_worthdrift.shopgui.last.missing.count%
%onembcmi_worthdrift.shopgui.last.not_in_worth.count%
%onembcmi_worthdrift.shopgui.last.illegal.count%
%onembcmi_worthdrift.cache.size%
```

WorthHelper placeholders:

```text
%onembcmi_worthhelper.enabled%
%onembcmi_worthhelper.last.result%
%onembcmi_worthhelper.last.materials%
%onembcmi_worthhelper.last.recipes%
%onembcmi_worthhelper.last.suggestions%
%onembcmi_worthhelper.last.missing%
%onembcmi_worthhelper.last.worth_entries%
%onembcmi_worthhelper.cache.size%
```

Placeholder paths are strict and allowlisted. Unknown or unsafe paths return an empty value instead of exposing internals or throwing noisy errors.

[Documentation index](README.md)
