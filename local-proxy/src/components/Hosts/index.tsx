"use client";

import hostToTarget from "./hostToTarget";

import style from "./style.module.css";
import { Target } from "./type";

export default function Hosts() {
  const hostList = Object.keys(hostToTarget).map((host) => {
    const { protocol, port, desc }: Target = hostToTarget[host];
    return {
      host,
      target: `${protocol}://${host}:${port}`,
      port,
      desc,
    };
  });

  return (
    <div>
      <h3 className={style.title}>Kurly Proxy</h3>
      <ul className={style.hosts}>
        {hostList.map(({ host, target, port, desc }, index) => {
          return (
            <li key={index} className={style.hostLine}>
              <a href={`https://${host}`} target="_blank">
                {host}
              </a>
              <span>to</span>
              <a href={target} target="_blank">
                {`${desc} ${port}`}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
