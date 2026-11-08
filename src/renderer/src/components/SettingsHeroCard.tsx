/**
 * The hero card at the top of Settings → General for co.work.
 */
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PixelButton } from './PixelButton';
import { Icon } from './Icon';

export function SettingsHeroCard() {
  const { t } = useTranslation();
  const [version, setVersion] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    window.cth.appInfo()
      .then((i) => { if (alive) setVersion(i.version); })
      .catch(() => { /* ignore */ });
    return () => { alive = false; };
  }, []);

  const showReleaseNotes = () => {
    window.dispatchEvent(new CustomEvent('cth:show-release-notes'));
  };

  const INK = 'var(--cth-ink-900)';
  const MONO = 'var(--cth-font-mono, monospace)';

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      background: 'var(--cth-paper-100)',
      border: `2px solid ${INK}`
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 14 }}>
        {/* Identity: name, the running version in plain sight, the plan. */}
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
            <span style={{
              fontFamily: 'var(--cth-font-display)', fontSize: 13, lineHeight: '20px', color: INK
            }}>CO.WORK</span>
            {version && (
              <span style={{
                fontFamily: MONO, fontSize: 15, fontWeight: 700, color: INK
              }}>v{version}</span>
            )}
            <span style={{
              fontFamily: MONO, fontSize: 9, letterSpacing: '.12em', textTransform: 'uppercase',
              padding: '2px 7px', background: 'var(--cth-mint-light)',
              boxShadow: 'inset 0 0 0 1px var(--cth-mint)', color: INK
            }}>LOCAL STUDIO</span>
          </div>
          <div style={{ marginTop: 6, fontSize: 12.5, lineHeight: 1.5, color: 'var(--cth-ink-700)', maxWidth: '64ch' }}>
            Every agent runs locally on your machine, in your private workspace, under your own keys. 100% private, autonomous digital software agency.
          </div>
        </div>

        {/* Studio Status Grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 8,
          marginTop: 4
        }}>
          <div style={{
            padding: '10px 12px', background: 'var(--cth-cream-100)',
            boxShadow: 'inset 0 0 0 1px var(--cth-ink-300)'
          }}>
            <div style={{ fontFamily: 'var(--cth-font-display)', fontSize: 8, color: 'var(--cth-ink-500)', textTransform: 'uppercase', marginBottom: 4 }}>
              NETWORK STATUS
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#1a7f37', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#2da44e' }} />
              100% OFFLINE / LOCAL
            </div>
          </div>
          <div style={{
            padding: '10px 12px', background: 'var(--cth-cream-100)',
            boxShadow: 'inset 0 0 0 1px var(--cth-ink-300)'
          }}>
            <div style={{ fontFamily: 'var(--cth-font-display)', fontSize: 8, color: 'var(--cth-ink-500)', textTransform: 'uppercase', marginBottom: 4 }}>
              ACTIVE ENGINE
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, color: INK }}>
              Gemini 3.8 Flash (High)
            </div>
          </div>
          <div style={{
            padding: '10px 12px', background: 'var(--cth-cream-100)',
            boxShadow: 'inset 0 0 0 1px var(--cth-ink-300)'
          }}>
            <div style={{ fontFamily: 'var(--cth-font-display)', fontSize: 8, color: 'var(--cth-ink-500)', textTransform: 'uppercase', marginBottom: 4 }}>
              AUTONOMOUS SQUAD
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, color: INK }}>
              10 Specialized Agents
            </div>
          </div>
        </div>

        {/* Action bar */}
        <div style={{
          display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center',
          paddingTop: 10, borderTop: `1px solid var(--cth-ink-300)`
        }}>
          <PixelButton variant="secondary" size="sm" onClick={showReleaseNotes}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <Icon name="sparkle" /> {t('settingsHero.whatsNew', 'Release Notes')}
            </span>
          </PixelButton>
        </div>
      </div>
    </div>
  );
}
