# 强缓存
## expires
  http1.0 是一个绝对时间 因为是个绝对时间 所以导致可能本地时间和服务器时间不一致出现问题
expires = max-age + 请求时间
## cache-control
1. no-cache 不命中强缓存 no-store不缓存 
2. 优先级大于缓存
3. 存在多个字段 最常用的为max-age
# 协商缓存
last-modifyed 时间 if-modified-since 
etag 既然由last-modified了为啥还需要etag呢，etag是基于文件生成的一个密文段，为了防止某些文件内容没有变但是修改时间改变了，或者某些文件在s级以下改变了 ETAG的优先级是大于last-modified的
