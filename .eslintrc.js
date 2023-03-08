{
  "root": true,
  "plugins": ["sort-imports"],
  "rules": {
    "sort-imports": ["error", {
      "ignoreCase": false,
      "ignoreDeclarationSort": false,
      "ignoreMemberSort": false,
      "memberSyntaxSortOrder": ["none", "all", "multiple", "single"],
      "allowSeparatedGroups": false
    }]
  },
  "overrides": [
    {
      "files": ["*.ts"],
      "extends": [
        "plugin:prettier/recommended"
      ]
    },

    {
      "files": ["*.html"],
      "extends": ["plugin:@angular-eslint/template/recommended"],
      "rules": {}
    },
    {
      "files": ["*.html"],
      "excludedFiles": ["*inline-template-*.component.html"],
      "extends": ["plugin:prettier/recommended"],
      "rules": {}
    }
  ]
}
