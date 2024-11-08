import sys
import json
from sparkai.llm.llm import ChatSparkLLM, ChunkPrintHandler
from sparkai.core.messages import ChatMessage

#星火认知大模型Spark Max的URL值，其他版本大模型URL值请前往文档（https://www.xfyun.cn/doc/spark/Web.html）查看
SPARKAI_URL = 'wss://spark-api.xf-yun.com/v1.1/chat'
#星火认知大模型调用秘钥信息，请前往讯飞开放平台控制台（https://console.xfyun.cn/services/bm35）查看
SPARKAI_APP_ID = 'ba28dd51'
SPARKAI_API_SECRET = 'ZDM0MGZiMjlkZTRhY2U4NjRjNTlkNjIx'
SPARKAI_API_KEY = '83cefa1886e5b1fcdd8467020fa2a891'
#星火认知大模型Spark Max的domain值，其他版本大模型domain值请前往文档（https://www.xfyun.cn/doc/spark/Web.html）查看
SPARKAI_DOMAIN = 'lite'

if __name__ == '__main__':
    # 从命令行参数获取内容
    content = sys.argv[1] if len(sys.argv) > 1 else '你好呀'
    
    spark = ChatSparkLLM(
        spark_api_url=SPARKAI_URL,
        spark_app_id=SPARKAI_APP_ID,
        spark_api_key=SPARKAI_API_KEY,
        spark_api_secret=SPARKAI_API_SECRET,
        spark_llm_domain=SPARKAI_DOMAIN,
        streaming=False,
    )
    
    messages = [ChatMessage(
        role="user",
        content=content
    )]
    
    handler = ChunkPrintHandler()
    result = spark.generate([messages], callbacks=[handler])
    
    # 提取生成的内容
    response_content = result.generations[0][0].text if result.generations else "没有生成内容"
    
    # 返回 JSON 格式
    print(json.dumps({"response": response_content}))