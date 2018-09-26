FROM nginx

# 删除默认http配置
RUN rm /etc/nginx/nginx.conf

# 添加http配置
ADD ./nginx.conf /etc/nginx/nginx.conf

# 删除默认serve配置
RUN rm /etc/nginx/conf.d/default.conf

# 添加serve配置
ADD ./default.conf /etc/nginx/conf.d/

# 复制构建后的代码
COPY ./dist  /usr/share/nginx/html/