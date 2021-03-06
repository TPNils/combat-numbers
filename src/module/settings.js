/* global game */
/* global window */

export default () => {
  game.settings.register('combat-numbers', 'show-controls', {
    name: game.i18n.localize('COMBATNUMBERS.SETTINGS.showControlsName'),
    hint: game.i18n.localize('COMBATNUMBERS.SETTINGS.showControlsHint'),
    scope: 'client',
    config: true,
    default: true,
    type: Boolean,
    onChange: () => window.location.reload(),
  });
  game.settings.register('combat-numbers', 'show-modifiers', {
    name: game.i18n.localize('COMBATNUMBERS.SETTINGS.showModifiersName'),
    hint: game.i18n.localize('COMBATNUMBERS.SETTINGS.showModifiersHint'),
    scope: 'world',
    config: true,
    default: false,
    type: Boolean,
  });
  game.settings.register('combat-numbers', 'do_masking', {
    name: game.i18n.localize('COMBATNUMBERS.CONTROLS.TOOLS.mask'),
    scope: 'world',
    config: false,
    default: false,
    type: Boolean,
  });
  game.settings.register('combat-numbers', 'mask_damage', {
    name: game.i18n.localize('COMBATNUMBERS.SETTINGS.maskDamage'),
    hint: game.i18n.localize('COMBATNUMBERS.SETTINGS.maskDamageHint'),
    scope: 'world',
    config: true,
    default: 'Hit',
    type: String,
  });
  game.settings.register('combat-numbers', 'mask_heal', {
    name: game.i18n.localize('COMBATNUMBERS.SETTINGS.maskHeal'),
    hint: game.i18n.localize('COMBATNUMBERS.SETTINGS.maskHealHint'),
    scope: 'world',
    config: true,
    default: 'Healed',
    type: String,
  });
  game.settings.register('combat-numbers', 'hp_object_path', {
    name: game.i18n.localize('COMBATNUMBERS.SETTINGS.hpObjectPathName'),
    hint: game.i18n.localize('COMBATNUMBERS.SETTINGS.hpObjectPathHint'),
    scope: 'world',
    config: true,
    default: '',
    type: String,
  });
  game.settings.register('combat-numbers', 'temp_hp_object_path', {
    name: game.i18n.localize('COMBATNUMBERS.SETTINGS.tempHpObjectPathName'),
    hint: game.i18n.localize('COMBATNUMBERS.SETTINGS.tempHpObjectPathHint'),
    scope: 'world',
    config: true,
    default: '',
    type: String,
  });
};
