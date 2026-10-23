# Ecosystem research — 23 October 2026

## Official facts and sources

- [Robinhood Chain product page](https://robinhood.com/us/en/crypto/chain/): discovered through the Chain link in Robinhood's Wallet FAQ, rather than assuming a URL.
- [Chain documentation](https://docs.robinhood.com/chain/): permissionless EVM-compatible Ethereum L2 built on Arbitrum, focused on tokenized real-world assets. Developer navigation covers deployment, contracts, bridging, fees, finality, account abstraction, nodes, and governance. This current documentation supersedes using the February testnet announcement as a description of today's network status.
- [Connection reference](https://docs.robinhood.com/chain/connecting/): mainnet ID 4663; testnet ID 46630; ETH gas on both. Public RPCs are https://rpc.mainnet.chain.robinhood.com and https://rpc.testnet.chain.robinhood.com. Explorer hosts are robinhoodchain.blockscout.com and explorer.testnet.chain.robinhood.com. Public endpoints are rate limited; production providers are documented. The landing page provides identities and a source link, not wallet-connection functionality.
- [Robinhood Wallet](https://robinhood.com/us/en/support/articles/robinhood-wallet/): separate self-custody application supporting Robinhood Chain. Wallet support is not Wally integration or endorsement.
- [Wallet FAQ](https://robinhood.com/us/en/support/articles/robinhood-wallet-faqs/): permissions, token taxes, concentration, and transaction education. Its network capability lists differ in detail from the Chain support article, so the landing page makes no specific swap-availability claim.
- [Protect your wallet](https://robinhood.com/us/en/support/articles/protect-your-wallet/): source for the separate Blockaid-backed label definitions and their limitations. No access to that screening is assumed for Wally.

## General security education

[OpenZeppelin access control](https://docs.openzeppelin.com/contracts/5.x/access-control) explains administrator roles and permissions governing minting, transfer freezes, and upgrades. The educational liquidity explanation is general reasoning: removable liquidity can affect exits, and checking a lock requires its terms and actual pool. It is not a claim that Wally verifies every lock. The supplied roadmap supports the basic unlocked-liquidity flag. Concentration, short history, permissions, and associations require context; none proves fraud alone. No threshold, scoring direction, formula, or weight was inferred.

## Wally scope and evidence boundary

Phase 1 being live comes from the project owner's confirmation, not independent runtime verification. Its four documented areas remain unchanged: address checks, 0–100 scoring and categories, basic flags, and web/Telegram access. The repository contains a presentation only; no scanner service, real product endpoint, or detection implementation is available here. Phase 2 is coming soon. Phases 3–5 are future roadmap. All original feature lists remain, including Solana-wallet collaboration as a future aspiration, never an existing partnership.

Holder concentration coverage is unconfirmed. Historical tracking and detailed category sub-scores belong to Phase 2; social graph mapping and behavior AI belong to Phase 3. Sample dashboard values remain illustrative. Missing data cannot establish safety.

## Independent reference review

[Ruginhood](https://ruginhood.com/) presents a live beta, read-only token investigation, discovery, local watch lists, approval review, and optional trading/bridging. It distinguishes missing evidence, community allegations, and findings. Local watch has no background notifications and is separate from Telegram. A bonding-curve launcher is explicitly experimental and disabled pending security review. These are website claims, not independently tested capabilities. No complete dated future roadmap was observed. Useful information-architecture lessons: make limitations visible next to findings, separate research from actions, and identify data scope. No branding, content, code, or layouts were copied.

[Hoodlens](https://hoodlens.io/) could not be inspected: two web fetches returned 502 errors; a direct HTTPS fetch failed certificate verification. No certificate protection was bypassed. Search provided no reliable same-domain product record. Its live/planned capabilities remain unavailable, and no claims were transferred to Wally.

## Implementation constraints

No metrics, token details, scoring methodology, endorsements, access to internal screening, or safety guarantees were introduced. Official token and Telegram settings remain empty and hidden. The 3D implementation and dependencies were left unchanged.
