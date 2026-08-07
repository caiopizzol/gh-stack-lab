# GitHub Stack Lab

Private laboratory for developing and validating agent workflows around stacked pull requests.

The repository is intentionally isolated from production projects so experiments can exercise real GitHub Stack, CI, review-comment, and branch-update behavior without mixing fixture activity with product work.

The repository is developed incrementally so each part of the orchestration can be observed independently before another capability is added.

## Local validation

```sh
bun install
bun run check
```

The current baseline intentionally contains only a strict TypeScript check, one deterministic unit test, and the equivalent GitHub Actions job. Review fixtures, AI review, branch protection, and disposable test Stacks will be added only after this foundation has run successfully on a real pull request.
