from graphqlclient import GraphQLClient
import json
import os
import pandas as pd
import numpy as np
from math import sqrt
from tqdm import tqdm_notebook as tqdm

from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error

client = GraphQLClient(
    "https://semicolon-prisma-cd06ea9a65.herokuapp.com/semicolon/prod")

arr = client.execute('''
{
users{
  id
  likes{
    post{
      id
    }
  }
}
}
''')
arr = json.loads(arr)

parr = client.execute('''
{
posts{
  id
}
}
''')
parr = json.loads(parr)

arr = arr['data']['users']

userId = []
for i in arr:
    userId.append(i['id'])

newArr = []

for i in arr:

    for j in i['likes']:

        newArr.append([i['id'], j['post']['id']])


users = []
posts = []
isLike = []
result = []
for i in arr:
    users.append(i['id'])
# 모든 유저값

for i in parr['data']['posts']:
    posts.append(i['id'])
# 모든 포스트값

# 좋아하는지 체크
for i in arr:
    for j in i['likes']:
        isLike.append([i['id'], j['post']['id']])

for i in range(len(users)):
    for j in range(len(posts)):
        for z in isLike:
            if z[0] == users[i] and z[1] == posts[j]:
                count = 5
                break
            else:
                count = 0
        result.append([users[i], posts[j], count])

users = []
posts = []
isLike = []
temp = []


# 여기서 데이터 분류
for i in range(len(result)):
    users.append(result[i][0])
    posts.append(result[i][1])
    isLike.append(result[i][2])
    temp.append(count)
    count = count + 1


ratings_df = pd.DataFrame(
    {'userId': users, 'movieId': posts, 'rating': isLike, 'count': temp})


train_df, test_df = train_test_split(
    ratings_df, test_size=0.2, random_state=1234)


"""### Sparse Matrix 만들기"""

sparse_matrix = train_df.groupby('movieId').apply(
    lambda x: pd.Series(x['rating'].values, index=x['userId'])).unstack()
sparse_matrix.index.name = 'movieId'

sparse_matrix

# fill sparse matrix with average of movie ratings
sparse_matrix_withmovie = sparse_matrix.apply(
    lambda x: x.fillna(x.mean()), axis=1)

# fill sparse matrix with average of user ratings
sparse_matrix_withuser = sparse_matrix.apply(
    lambda x: x.fillna(x.mean()), axis=0)

sparse_matrix_withmovie

sparse_matrix_withuser

"""## Matrix Factorization with SVD"""


def get_svd(s_matrix, k=8):
    u, s, vh = np.linalg.svd(s_matrix.transpose())
    S = s[:k] * np.identity(k, np.float)
    T = u[:, :k]
    Dt = vh[:k, :]

    item_factors = np.transpose(np.matmul(S, Dt))
    user_factors = np.transpose(T)

    return item_factors, user_factors


"""### 1. with average movie ratings"""

item_factors, user_factors = get_svd(sparse_matrix_withmovie)
prediction_result_df = pd.DataFrame(np.matmul(item_factors, user_factors),
                                    columns=sparse_matrix_withmovie.columns.values, index=sparse_matrix_withmovie.index.values)

recommand = prediction_result_df.transpose()

# print(recommand)
favorite = []
for i in range(len(recommand.index)):
    for j in range(len(recommand.columns)):
        favorite.append(
            {'userId': recommand.index[i], 'postId': recommand.columns[j], 'isLikes': recommand.values[i][j]})

# 프린트를 해야 js에서 데이터 받기 가능
print(json.dumps(favorite, ensure_ascii=False, indent="\t"))
