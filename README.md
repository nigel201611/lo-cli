<!--
 * @Author: nigel
 * @Date: 2020-12-02 18:02:13
 * @LastEditTime: 2020-12-10 18:51:28
-->

# lo-cli

Through the command line, collapse the framework template of each technology stack

## use

### init or create project

```
npm install -g @nigel2020/lo-cli <br/>
lo create my-project
```

### can add your template repository which surport github|gitlab|bitbucket|gitee repository

```
lo add react-single-page github|gitlab|bitbucket|gitee:username/repository-name <br/>
lo add vue-signle-page gitee:nigel2018/nri_demo_webpack4 <br/>
lo add other-single-page direct:https://github.com/xxxx/xxxx.git <br/>
```

### also surport customize file,you can configure data in lo.json in your current working direcotry

lo.json file contents as following: <br/>

```json
{
  "registryRepository": [
    {
      "name": "vue-signle-page2",
      "url": "gitee:username/repo-name"
    }
  ]
}
```

### view all the template repository

```
lo ls
```

### you can add --github options when you use lo cli to create template project

> --github option will auto help you to create organization repository and git remote add,git push your code to it;<br/>
> currently just consider github;<br/>

example:lo create test --github <br/>
you need to set organization repository in lo.json in your current working directory <br/>

```json
{
  "registryRepository": [],
  "githubToken": "your github access token",
  "githubOrgsName": "your github organization name"
}
```

github access token can be set in github Settings <br/>
Settings->Developer settings->Personal acess tokens <br/>
remember to choice user and repo scope <br/>
refer link: <br>
https://docs.github.com/cn/free-pro-team@latest/rest/reference/repos#create-an-organization-repository
