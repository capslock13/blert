'use client';

import { useState, useEffect } from 'react';

import CollapsiblePanel from '../../components/collapsible-panel';
import {
  PvMContent,
  PvMContentLogo,
} from '../../components/pvm-content-logo/pvm-content-logo';
import Image from 'next/image';
import { RaidOverview, loadRecentRaidInformation } from '../../actions/raid';
import RaidHistory from '../../components/raid-history';

import styles from './style.module.scss';
import { set } from 'mongoose';

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [raids, setRaids] = useState<RaidOverview[]>([]);

  useEffect(() => {
    const getRaids = async () => {
      setLoading(true);
      const raidResults = await loadRecentRaidInformation(5);
      setRaids(raidResults);
      setLoading(false);
    };

    getRaids();
  }, []);

  return (
    <>
      <PvMContentLogo
        pvmContent={PvMContent.TheatreOfBlood}
        height={350}
        width={623}
      />
      <CollapsiblePanel
        panelTitle="The Theatre Of Blood"
        maxPanelHeight={500}
        defaultExpanded={true}
        className={styles.tobOverview}
        disableExpansion={true}
      >
        <div className={styles.tobOverviewInner}>
          <Image
            className={styles.raid__Logo}
            src="/tobdataegirl.png"
            alt="ToB Preview"
            height={300}
            width={300}
            style={{ objectFit: 'cover' }}
          />

          <div className={styles.textGreeting}>
            <p
              style={{
                fontSize: '26px',
                paddingTop: '40px',
              }}
            >
              Welcome to the Theatre of Blood data tracker!
              <br />
              <br />
              Feel free to explore some of the recently recorded raids, or
              search for your (or a friends) RSN to see some player stats.
              <br />
              <br />
              If you have any questions please feel free to reach out to us on
              our{' '}
              <a
                href="https://discord.gg/c5Hgv3NnYe"
                target="_blank"
                rel="noreferrer noopener"
                style={{ textDecoration: 'underline' }}
              >
                Discord Server
              </a>
              .
            </p>
          </div>
        </div>
      </CollapsiblePanel>

      <CollapsiblePanel
        panelTitle="Recently Recorded Raids"
        maxPanelHeight={800}
        defaultExpanded={true}
        className={styles.tobRecentRecordings}
      >
        <RaidHistory raids={raids} loading={loading} />
      </CollapsiblePanel>
    </>
  );
}
