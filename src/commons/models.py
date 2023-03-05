from django.db import models
from hashids import Hashids


def get_hash_ids_default():
    return Hashids(min_length=12)


class BaseModel(models.Model):
    class Meta:
        abstract = True

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    _HASH_IDS = get_hash_ids_default()

    @classmethod
    def encode_hash_id(cls, from_id):
        return cls._HASH_IDS.encode(from_id)

    @classmethod
    def decode_hash_id(cls, from_id):
        return cls._HASH_IDS.decode(from_id)[0]

    def get_hash_id(self):
        return self.encode_hash_id(self.id)
