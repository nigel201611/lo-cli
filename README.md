<!--
 * @Author: nigel
 * @Date: 2020-12-02 18:02:13
 * @LastEditTime: 2020-12-10 15:23:08
-->

# lo-cli

Through the command line, collapse the framework template of each technology stack

## use

### init or create project

npm install -g @nigel2020/lo-cli <br/>
lo create my-project

### can add your template repository which surport github|gitlab|bitbucket|gitee repository

lo add react-single-page github|gitlab|bitbucket|gitee:username/repository-name <br/>
lo add vue-signle-page gitee:nigel2018/nri_demo_webpack4 <br/>
lo add other-single-page direct:https://github.com/xxxx/xxxx.git <br/>

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

lo ls
