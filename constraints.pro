gen_enforced_field(WorkspaceCwd, 'repository.type', 'git') :- \+ workspace_field(WorkspaceCwd, 'private', 'true').
gen_enforced_field(WorkspaceCwd, 'repository.url', 'https://github.com/tophat/commit-utils.git') :- \+ workspace_field(WorkspaceCwd, 'private', 'true').
gen_enforced_field(WorkspaceCwd, 'repository.directory', WorkspaceCwd) :- \+ workspace_field(WorkspaceCwd, 'private', 'true').

gen_enforced_field(WorkspaceCwd, 'publishConfig.registry', 'https://registry.npmjs.org/') :- \+ workspace_field(WorkspaceCwd, 'private', 'true').
gen_enforced_field(WorkspaceCwd, 'publishConfig.access', 'public') :- \+ workspace_field(WorkspaceCwd, 'private', 'true').
